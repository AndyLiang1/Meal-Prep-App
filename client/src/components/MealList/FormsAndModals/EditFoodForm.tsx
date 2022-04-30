import * as React from 'react';
import { useEffect, useState } from 'react';
import { Food } from '../../../generated/graphql-client';
import styles from './EditFoodForm.module.css';
import { Formik, Form, Field, useField } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import { Ingredient } from './Ingredient';

export interface IEditFoodFormProps {
    fromWhere: string;
    food: Food;
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditFoodForm({ fromWhere, food, setEditForm }: IEditFoodFormProps) {
    const [actualAmount, setActualAmount] = useState<number>(food.actualAmount);
    const dispatch = useDispatch();
    const [newIngredient, setNewIngredient] = useState<string>();
    const [ingredients, setIngredients] = useState<Food[]>([]);

    const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);

    const initialValues = {
        newActualAmount: actualAmount
    };

    useEffect(() => {
        console.log('herez');
        console.log(ingredients);
    }, [ingredients]);

    const validationSchema = Yup.object().shape({});

    useEffect(() => {
        for (let i = 0; i < user.foodList!.length; i++) {
            if (newIngredient === user.foodList![i].name) {
                const foodToAdd = user.foodList![i];
                const newIngredientsList = ingredients;
                newIngredientsList.push(foodToAdd);
                console.log('hereeeeeeee');
                setIngredients(newIngredientsList);
            }
        }
        // This allows us to add the same ingredient twice,
        setNewIngredient('');
    }, [newIngredient]);

    const onSubmit = () => {};
    return (
        <div className={styles.container}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
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
                            <Field
                                className="edit-field"
                                name="newActualAmount"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.target.value !== '' ? setActualAmount(parseInt(event.target.value)) : setActualAmount(0);
                                }}
                                value={actualAmount}
                            ></Field>
                            <button type="submit">Submit</button>
                        </div>
                    )}
                    {fromWhere === 'foodList' && (
                        <div>
                            <div>Edit Food</div>
                            <div>Name</div>
                            <Field className="add_field" name="name" type="text" />
                            <div>Calories</div>
                            <Field className="add_field" name="calories" type="number" />
                            <div>Proteins</div>
                            <Field className="add_field" name="proteins" type="number" />
                            <div>Carbs</div>
                            <Field className="add_field" name="carbs" type="number" />
                            <div>Fats</div>
                            <Field className="add_field" name="fats" type="number" />
                            <div>Given Amount</div>
                            <Field className="add_field" name="givenAmount" type="number" />
                            <div>Actual Amount</div>
                            <div>Ingredients</div>
                            <Field
                                className="add_field"
                                name="ingredients"
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
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
}
