import { init } from '@graphql-codegen/cli';
import { Formik, Form, Field } from 'formik';
import { setMaxListeners } from 'process';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Food } from '../../../generated/graphql-client';
import { setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import styles from './AddFoodForm.module.css';
import { Ingredient } from './Ingredient';

import { useWhatChanged, setUseWhatChange } from '@simbathesailor/use-what-changed';

export interface IAddFoodFormProps {
    type: string;
    setAddFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddFoodForm({ type, setAddFoodForm }: IAddFoodFormProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const [newIngredient, setNewIngredient] = useState<string>();
    const [foods, setFoods] = useState<Food[]>([]);
    const [ingredients, setIngredients] = useState<Food[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {}, [user]);
    const initialValues = {
        existingFood: {},
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
        name: Yup.string().max(50),
        calories: Yup.number().typeError('Input a number please').integer().min(1),
        proteins: Yup.number().typeError('Input a number please').min(1),
        carbs: Yup.number().typeError('Input a number please').min(1),
        fats: Yup.number().typeError('Input a number please').min(1),
        givenAmount: Yup.number().typeError('Input a number please').integer().min(1),
        actualAmount: Yup.number().typeError('Input a number please').integer().min(1)
    });

    const onSelectChange = async (e: any) => {
        const foodName = e.target.value;
        console.log(foodName);
        for (let i = 0; i < user.foodList!.length; i++) {
            if (foodName === user.foodList![i].name) {
                const foodToAdd = user.foodList![i];
                const newIngredientsList = ingredients;
                newIngredientsList.push(foodToAdd);
                await setIngredients(newIngredientsList);
            }
        }
    };

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

    const submit = (data: any) => {
        console.log('here');
        console.log(data);
    };
    return (
        <div className={styles.container}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
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
                                {user.foodList!.map((food: Food, index: number) => {
                                    return (
                                        <option key={index} value={food.name}>
                                            {food.name}
                                        </option>
                                    );
                                })}
                            </Field>
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
                                onChange={(e: any) => {
                                    setNewIngredient(e.target.value);
                                    // setTrigger(!trigger);
                                }}
                                value={newIngredient}
                            >
                                <option value="-"></option>
                                {user.foodList.map((food: Food, index: number) => {
                                    return (
                                        <option key={index} value={food.name}>
                                            {food.name}
                                        </option>
                                    );
                                })}
                            </Field>
                            {ingredients.map((food: Food, index: number) => {
                                return <Ingredient key={index} ingredient={food}></Ingredient>;
                            })}
                            <button className="add_button" type="submit">
                                Add
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
