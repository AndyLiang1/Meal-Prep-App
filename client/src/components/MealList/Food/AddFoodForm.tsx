import { init } from '@graphql-codegen/cli';
import { Formik, Form, Field } from 'formik';
import { setMaxListeners } from 'process';
import * as React from 'react';
import * as Yup from 'yup';
import styles from './AddFoodForm.module.css'

export interface IAddFoodFormProps {
    setAddingFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
}


export function AddFoodForm({setAddingFoodForm}: IAddFoodFormProps) {
    const initialValues = {
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

    const onSubmit = () => {};
    return (
        <div className = {styles.container}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <h1>Create a new food</h1>
                            <button onClick={() => setAddingFoodForm(false)}>X</button>
                        </div>
                        <Field className="add_field" name="name" type="text" />
                        <h1>Calories</h1>
                        <Field className="add_field" name="calories" type="number" />
                        <h1>Proteins</h1>
                        <Field className="add_field" name="proteins" type="number" />
                        <h1>Carbs</h1>
                        <Field className="add_field" name="carbs" type="number" />
                        <h1>Fats</h1>
                        <Field className="add_field" name="fats" type="number" />
                        <h1>Given Amount</h1>
                        <Field className="add_field" name="givenAmount" type="number" />
                        <h1>Actual Amount</h1>
                        <Field className="add_field" name="actualAmount" type="number" />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
