import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import { Food, Meal, DeleteMealDocument } from '../../../generated/graphql-client';
import { AddFoodForm } from '../Food/AddFoodForm';
import { DeleteMealModal } from '../Food/DeleteMealModal';
import { FoodInMeal } from '../Food/FoodInMeal';
import styles from './MealInDay.module.css';

export interface IMealInDayProps {
    foods: Food[];
    mealId: String;
}

export function MealInDay({ foods, mealId }: IMealInDayProps) {
    const [addingFoodForm, setAddingFoodForm] = useState<boolean>(false);
    const [deletingMealModal, setDeletingMealModal] = useState<boolean>(false)

    const [deleteMeal, {data, error, loading}] = useMutation(DeleteMealDocument)

    return (
        <div className={styles.container}>
            <div className={styles.foods_container}>
                {foods.map((food: any) => {
                    return <FoodInMeal food={food}></FoodInMeal>;
                })}
            </div>
            <div className={styles.btn_container}>
                <button onClick={() => setAddingFoodForm(true)}>Add food </button>
                <button onClick = {() => setDeletingMealModal(true)}>Delete Meal </button>
            </div>
            {addingFoodForm ? <AddFoodForm setAddingFoodForm={setAddingFoodForm}></AddFoodForm> : null}
            {deletingMealModal ? <DeleteMealModal setDeletingMealModal={setDeletingMealModal}></DeleteMealModal> : null}
        </div>
    );
}
