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
            <div className={styles.foods_container}>
                {foods.map((food: any) => {
                    return <FoodInMeal food={food}></FoodInMeal>;
                })}
            </div>
            <div className={styles.btn_container}>
                <button onClick={() => setAddingFood(true)}>Add food </button>
                <button>Delete food </button>
            </div>
            {addingFood ? <AddFoodForm setAddingFood={setAddingFood}></AddFoodForm> : null}

        </div>
    );
}
