import { init } from '@graphql-codegen/cli';
import { Formik, Form, Field, setIn } from 'formik';
import { setMaxListeners } from 'process';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { CreateFoodFromFoodListDocument, CreateFoodFromMealDocument, CreateFoodInput, Food } from '../../../generated/graphql-client';
import { setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import styles from './AddFoodForm.module.css';
import { Ingredient } from './Ingredient';

import { useWhatChanged, setUseWhatChange } from '@simbathesailor/use-what-changed';
import { useMutation } from '@apollo/client';

export interface IAddFoodFormProps {
    type: string;
    setAddFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
    mealId: string;
}

interface CreateFoodFromMealInput {
    existingFood: Food | string;
    existingFoodActualAmount: number;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    ingredients: Food[];
    givenAmount: number;
    actualAmount: number;
}

export function AddFoodForm({ type, setAddFoodForm, mealId }: IAddFoodFormProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const [newIngredient, setNewIngredient] = useState<string>();
    const [foods, setFoods] = useState<Food[]>([]);
    const [ingredients, setIngredients] = useState<Food[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('')

    const dispatch = useDispatch();

    const [createFoodFromMeal] = useMutation(CreateFoodFromMealDocument);
    const [createFoodFromFoodList] = useMutation(CreateFoodFromFoodListDocument);

    useEffect(() => {}, [user]);
    const initialValues: CreateFoodFromMealInput = {
        existingFood: '',
        existingFoodActualAmount: 0,
        name: '',
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        ingredients: [],
        givenAmount: 0,
        actualAmount: 0
    };

    const validationSchema = Yup.object().shape({
        // name: Yup.string().max(50),
        // calories: Yup.number().typeError('Input a number please').integer().min(1),
        // proteins: Yup.number().typeError('Input a number please').min(1),
        // carbs: Yup.number().typeError('Input a number please').min(1),
        // fats: Yup.number().typeError('Input a number please').min(1),
        // givenAmount: Yup.number().typeError('Input a number please').integer().min(1),
        // actualAmount: Yup.number().typeError('Input a number please').integer().min(1)
    });

    useEffect(() => {
        for (let i = 0; i < user.foodList!.length; i++) {
            if (newIngredient === user.foodList![i].name) {
                const foodToAdd = user.foodList![i];
                const newIngredientsList = ingredients;
                newIngredientsList.push(foodToAdd);
                setIngredients(newIngredientsList);
            }
        }
        // This allows us to add the same ingredient twice,
        setNewIngredient('');
    }, [newIngredient]);

    const onSubmit = async (submittedData: CreateFoodFromMealInput) => {
        if (submittedData.existingFood !== '' && submittedData.name !== '') {
            setErrorMsg('Please only use one of the options to add a food to this meal. Either add an existing food, or create a new food with a unique name.')
        }
        // check what we are adding
        if (submittedData.existingFood !== '') {
            let createFoodFromMealArgs: CreateFoodInput;
            console.log('her2e');

            user.foodList.forEach((food) => {
                if (submittedData.existingFood === food.name) {
                    const { name, calories, proteins, carbs, fats, givenAmount, actualAmount } = food;
                    const ingredientNames: string[] = [];
                    food.ingredients.forEach((ingredient) => {
                        ingredientNames.push(ingredient.name);
                    });
                    createFoodFromMealArgs = {
                        userId: user.id,
                        dayIndex,
                        mealId,
                        name,
                        calories,
                        proteins,
                        carbs,
                        fats,
                        ingredientNames,
                        givenAmount,
                        actualAmount: submittedData.existingFoodActualAmount
                    };
                }
            });

            const { data } = await createFoodFromMeal({
                variables: {
                    input: createFoodFromMealArgs!
                }
            });
        } else if (submittedData.name !== '') {
            // then we are not using exisitng food
            const { name, calories, proteins, carbs, fats, givenAmount, actualAmount } = submittedData;
            const ingredientNames: string[] = [];
            ingredients.forEach((ingredient) => {
                ingredientNames.push(ingredient.name);
            });
            const createFoodFromMealArgs: CreateFoodInput = {
                userId: user.id,
                dayIndex,
                mealId,
                name,
                calories,
                proteins,
                carbs,
                fats,
                ingredientNames,
                givenAmount,
                actualAmount
            };
            console.log('here');
            const { data } = await createFoodFromMeal({
                variables: {
                    input: createFoodFromMealArgs
                }
            });
        }
    };

    return (
        <div className={styles.container}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.title_container}>
                            {type === 'meal' ? <div>Add food to meal</div> : <div>Add food to food list</div>}

                            <button
                                onClick={() => {
                                    dispatch(setModalStatus(false));
                                    setAddFoodForm(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                        <div className={styles.existing_food_container}>
                            <div>Use existing food</div>
                            <Field className="add_field" name="existingFood" as="select">
                                <option value=""></option>

                                {user.foodList!.map((food: Food, index: number) => {
                                    return (
                                        <option key={index} value={food.name}>
                                            {food.name}
                                        </option>
                                    );
                                })}
                            </Field>
                            <div>Actual Amount</div>
                            <Field className="add_field" name="existingFoodActualAmount"></Field>
                        </div>
                        <div className={styles.create_new_food_container}>
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
                            <Field className="add_field" name="actualAmount" type="number" />
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

                        <div className={styles.btn_container}>
                            <button className="add_button" type="submit">
                                Add
                            </button>
                            {errorMsg !== '' ? errorMsg : null }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
