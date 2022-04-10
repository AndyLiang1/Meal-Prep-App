import * as React from 'react';
import { useState } from 'react';
import { AddFoodForm } from '../Food/AddFoodForm';
import { FoodInMeal } from '../Food/FoodInMeal';
import styles from './MealInDay.module.css';

export interface IMealInDayProps {
    foods: [];
}

export function MealInDay({ foods }: IMealInDayProps) {
    const [addingFood, setAddingFood] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <div className={styles.headers_container}>
                <div className={styles.headers}>
                    <h1>Name</h1>
                    <h1>Calories</h1>
                    <h1>Proteins</h1>
                    <h1>Carbs</h1>
                    <h1>Fats</h1>
                    <h1>Edit</h1>
                    <h1>Delete</h1>
                </div>
            </div>
            <div>
                {foods.map((food: any) => {
                    return <FoodInMeal food={food}></FoodInMeal>;
                })}
                <button onClick={() => setAddingFood(true)}>Add food </button>
            </div>

            {addingFood ? <AddFoodForm setAddingFood={setAddingFood}></AddFoodForm> : null}
        </div>
    );
}
