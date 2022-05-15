import * as React from 'react';
import { useEffect, useState } from 'react';
import { EditFoodFromFoodListDocument, EditFoodFromMealListDocument, EditFoodInput, Food, GetMealsDocument } from '../../../generated/graphql-client';
import styles from './EditFoodForm.module.css';
import { Formik, Form, Field, useField } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore, setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import { Ingredient } from './Ingredient';
import { useLazyQuery, useMutation } from '@apollo/client';
import { getUserMeals } from '../../helpers/GetMealsFunction';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { DropdownStats } from './DropdownStats';

export interface IEditFoodFormProps {
    fromWhere: string;
    food: Food;
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
    foodIndex?: number;
}

export type EditFoodFormData = {
    newActualAmount: number;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    ingredients: Food[];
    givenAmount: number;
};

type totalStats = {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
};

export function EditFoodForm({ fromWhere, food, setEditForm, mealId, foodIndex }: IEditFoodFormProps) {
    const [actualAmount, setActualAmount] = useState<number>(food.actualAmount);
    const dispatch = useDispatch();
    const [newIngredient, setNewIngredient] = useState<Food>();
    const [ingredients, setIngredients] = useState<Food[]>(food.ingredients);
    const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const [editFoodFromMealList] = useMutation(EditFoodFromMealListDocument);
    const [editFoodFromFoodList] = useMutation(EditFoodFromFoodListDocument);
    const [getMeals] = useLazyQuery(GetMealsDocument);
    const [totalStats, setTotalStats] = useState({ calories: 0, proteins: 0, carbs: 0, fats: 0 });
    const [newIngActualAmount, setNewIngActualAmount] = useState(0);


    const [showIngCals, setShowIngCals] = useState(false);
    const [showIngP, setShowIngP] = useState(false);
    const [showIngC, setShowIngC] = useState(false);
    const [showIngF, setShowIngF] = useState(false);

    const initialValues = {
        newActualAmount: '',
        newFoodName: food.name,
        newCalories: totalStats.calories ? totalStats.calories : food.calories,
        newProteins: totalStats.proteins ? totalStats.proteins : food.proteins,
        newCarbs: totalStats.carbs ? totalStats.carbs : food.carbs,
        newFats: totalStats.fats ? totalStats.fats : food.fats,
        newIngredient: {},
        newGivenAmount: food.givenAmount
    };

    const validationSchema = Yup.object().shape({});
    useEffect(() => {
        let cals = 0,
            p = 0,
            c = 0,
            f = 0;
        ingredients.forEach((ingredient) => {
            cals += ingredient.calories;
            p += ingredient.proteins;
            c += ingredient.carbs;
            f += ingredient.fats;
        });
        setTotalStats({ calories: cals, proteins: p, carbs: c, fats: f });
    }, [ingredients]);

    const addToIngredientList = (newIngredientActualAmount: number) => {
        if (newIngredient) {
            newIngredient.actualAmount = newIngredientActualAmount;
            const newIngredientsList = [...ingredients];
            newIngredientsList.push(newIngredient);
            setIngredients(newIngredientsList);
            const { calories, proteins, carbs, fats, givenAmount, actualAmount } = newIngredient;
            setTotalStats({
                calories: totalStats.calories + parseInt(((calories * actualAmount) / givenAmount).toFixed(2)),
                proteins: totalStats.proteins + parseInt(((proteins * actualAmount) / givenAmount).toFixed(2)),
                carbs: totalStats.carbs + parseInt(((carbs * actualAmount) / givenAmount).toFixed(2)),
                fats: totalStats.fats + parseInt(((fats * actualAmount) / givenAmount).toFixed(2))
            });
        }
    };

    const onSubmit = async (submittedData: any) => {
        if (fromWhere === 'mealList') {
            const editFoodFromMealArgs: EditFoodInput = {
                userId: user.id,
                dayIndex,
                mealId,
                foodIndex,
                newActualAmount: parseInt(submittedData.newActualAmount)
            };

            const { data } = await editFoodFromMealList({
                variables: {
                    input: editFoodFromMealArgs
                }
            });
        } else if (fromWhere === 'foodList') {
            const { newFoodName, newCalories, newProteins, newCarbs, newFats, newIngredient, newGivenAmount } = submittedData;
            const newIngredientNames: string[] = [];
            ingredients.forEach((ingredient) => newIngredientNames.push(ingredient.name));

            const editFoodFromMealArgs: EditFoodInput = {
                userId: user.id,
                foodName: food.name,
                newFoodName,
                newCalories,
                newProteins,
                newCarbs,
                newFats,
                newIngredientNames,
                newGivenAmount,
                newActualAmount: newGivenAmount
            };

            const { data } = await editFoodFromFoodList({
                variables: {
                    input: editFoodFromMealArgs
                }
            });
        }
        refreshMealList();
    };

    const refreshMealList = async () => {
        const day = await getUserMeals(dayIndex, user, getMeals);

        dispatch(
            addUserToStore({
                username: user.username,
                id: user.id,
                day,
                loggedIn: true,
                accessToken: localStorage.getItem('accessToken')!,
                foodList: user.foodList
            })
        );
    };

    return (
        <div className={styles.container}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form
                    onChange={(event: any) => {
                        if (event.target.name === 'newActualAmount') {
                            console.log(event.target.value === '');
                            event.target.value !== '' ? setActualAmount(parseInt(event.target.value)) : setActualAmount(0);
                        }
                    }}
                >
                    <button
                        onClick={() => {
                            dispatch(setModalStatus(false));
                            setEditForm(false);
                        }}
                    >
                        X
                    </button>
                    {fromWhere === 'mealList' && (
                        <div>
                            <div>Edit Food</div>
                            <div className={styles.food_stats}>Cals: {((food.calories * actualAmount) / food.givenAmount).toFixed(0)}</div>
                            <div className={styles.right_smaller_data_container}></div>
                            <div className={styles.food_stats}>P: {((food.proteins * actualAmount) / food.givenAmount).toFixed(1)}</div>
                            <div className={styles.food_stats}>C: {((food.carbs * actualAmount) / food.givenAmount).toFixed(1)}</div>
                            <div className={styles.food_stats}>F: {((food.fats * actualAmount) / food.givenAmount).toFixed(1)}</div>
                            <div>GivenAmount: {food.givenAmount}</div>
                            <div>ActualAmount: {actualAmount}</div>
                            <Field className="edit-field" name="newActualAmount" type="text"></Field>
                            <button type="submit">Submit</button>
                        </div>
                    )}
                    {fromWhere === 'foodList' && (
                        <div>
                            <div>Edit Food</div>
                            <div>Note: This will edit every instance of this food in your meal lists accross all 7 days.</div>
                            <div>Name</div>
                            <Field className="add_field" name="newFoodName" type="text" />

                            <div>Calories</div>
                            <Field className="add_field" name="newCalories" type="number" />
                            {!showIngCals ? (
                                <AiOutlineDown
                                    onClick={() => {
                                        setShowIngCals(true);
                                    }}
                                ></AiOutlineDown>
                            ) : (
                                <AiOutlineUp onClick={() => setShowIngCals(false)} />
                            )}
                            {showIngCals && <DropdownStats statName={'calories'} ingredients={ingredients}></DropdownStats>}

                            <div>Proteins</div>
                            <Field className="add_field" name="newProteins" type="number" />
                            {!showIngP ? (
                                <AiOutlineDown
                                    onClick={() => {
                                        setShowIngP(true);
                                    }}
                                ></AiOutlineDown>
                            ) : (
                                <AiOutlineUp onClick={() => setShowIngP(false)} />
                            )}
                            {showIngP && <DropdownStats statName={'proteins'} ingredients={ingredients}></DropdownStats>}

                            <div>Carbs</div>
                            <Field className="add_field" name="newCarbs" type="number" />
                            {!showIngC ? (
                                <AiOutlineDown
                                    onClick={() => {
                                        setShowIngC(true);
                                    }}
                                ></AiOutlineDown>
                            ) : (
                                <AiOutlineUp onClick={() => setShowIngC(false)} />
                            )}
                            {showIngC && <DropdownStats statName={'carbs'} ingredients={ingredients} />}

                            <div>Fats</div>
                            <Field className="add_field" name="newFats" type="number" />
                            {!showIngF ? (
                                <AiOutlineDown
                                    onClick={() => {
                                        setShowIngF(true);
                                    }}
                                ></AiOutlineDown>
                            ) : (
                                <AiOutlineUp onClick={() => setShowIngF(false)} />
                            )}
                            {showIngF && <DropdownStats statName={'fats'} ingredients={ingredients}></DropdownStats>}

                            <div>Given Amount</div>
                            <Field className="add_field" name="newGivenAmount" type="number" />

                            <div>Actual Amount</div>
                            <div>Ingredients</div>
                            <Field
                                className="add_field"
                                name="ingredients"
                                as="select"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newIngName = e.target.value;
                                    user.foodList.forEach((food) => {
                                        if (food.name === newIngName) {
                                            let ingredient = {
                                                ...food
                                            };
                                            setNewIngredient(ingredient);
                                        }
                                    });
                                }}
                                value={newIngredient ? newIngredient.name : '--'}
                            >
                                <option value=""></option>
                                {user.foodList.map((food: Food, index: number) => {
                                    return (
                                        <option key={index} value={food.name}>
                                            {food.name}
                                        </option>
                                    );
                                })}
                            </Field>
                            {newIngredient && (
                                <div className={styles.potentialNewIng}>
                                    <div>
                                        {newIngredient.name} | Given Amount: {newIngredient.givenAmount}
                                    </div>
                                    <div> Actual Amount</div>
                                    <Field
                                        className={styles.newIngActualAmount}
                                        type="number"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewIngActualAmount(parseInt(e.target.value))}
                                        value={newIngActualAmount}
                                    ></Field>
                                    <button onClick={() => addToIngredientList(newIngActualAmount)}>Add</button>
                                </div>
                            )}
                            {ingredients.map((food: Food, index: number) => {
                                return <Ingredient key={index} ingredient={food} ingredients={ingredients} setIngredients={setIngredients}></Ingredient>;
                            })}
                            <button type="submit">Submit</button>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
}
