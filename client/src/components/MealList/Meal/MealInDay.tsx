import * as React from 'react';
import { useState } from 'react';
import { AddFoodForm } from '../Food/AddFoodForm';
import { FoodInMeal } from '../Food/FoodInMeal';
import style from './Meal.module.css';

export interface IMealInDayProps {
    foods: [];
}

export function MealInDay({ foods }: IMealInDayProps) {
    const [addingFood, setAddingFood] = useState<boolean>(false)

    
    return (
        <div>
            <div className={style.container}>
                {foods.map((food: any) => {
                    return <FoodInMeal food={food}></FoodInMeal>;
                })}
                <button onClick = {() => setAddingFood(true)}>Add food </button>
            </div>

            {addingFood ? (
                <AddFoodForm setAddingFood = {setAddingFood}></AddFoodForm>
            ) : null}
        </div>
    );
}
