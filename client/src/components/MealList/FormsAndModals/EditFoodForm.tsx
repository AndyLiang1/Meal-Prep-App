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

export function EditFoodForm({ fromWhere, food, setEditForm, mealId, foodIndex }: IEditFoodFormProps) {
    const [actualAmount, setActualAmount] = useState<number>(food.actualAmount);
    const dispatch = useDispatch();
    const [newIngredient, setNewIngredient] = useState<string>();
    const [ingredients, setIngredients] = useState<Food[]>(food.ingredients);
    const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const [editFoodFromMealList] = useMutation(EditFoodFromMealListDocument);
    const [editFoodFromFoodList] = useMutation(EditFoodFromFoodListDocument);
    const [getMeals] = useLazyQuery(GetMealsDocument);

    const initialValues = {
        newActualAmount: '',
        newFoodName: food.name,
        newCalories: food.calories,
        newProteins: food.proteins,
        newCarbs: food.carbs,
        newFats: food.fats,
        newIngredient: {},
        newGivenAmount: food.givenAmount
    };

    const validationSchema = Yup.object().shape({});

    useEffect(() => {
        for (let i = 0; i < user.foodList!.length; i++) {
            if (newIngredient === user.foodList![i].name) {
                const foodToAdd = user.foodList[i];
                console.log(foodToAdd);
                const newIngredientsList = [...ingredients];
                newIngredientsList.push(foodToAdd);
                setIngredients(newIngredientsList);
            }
        }
        // This allows us to add the same ingredient twice,
        setNewIngredient('');
    }, [newIngredient]);

    const onSubmit = async (submittedData: any) => {
        console.log(submittedData);
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

            const { data } = await editFoodFromMealList({
                variables: {
                    input: editFoodFromMealArgs
                }
            });
        }
        refreshMealList()
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
                            <div>Proteins</div>
                            <Field className="add_field" name="newProteins" type="number" />
                            <div>Carbs</div>
                            <Field className="add_field" name="newCarbs" type="number" />
                            <div>Fats</div>
                            <Field className="add_field" name="newFats" type="number" />
                            <div>Given Amount</div>
                            <Field className="add_field" name="newGivenAmount" type="number" />
                            <div>Actual Amount</div>
                            <div>Ingredients</div>
                            <Field
                                className="add_field"
                                name="newIngredient"
                                as="select"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setNewIngredient(e.target.value);
                                }}
                                value={newIngredient}
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
