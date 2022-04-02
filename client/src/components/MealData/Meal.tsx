import * as React from 'react';
import { useState } from 'react';
import { AddFoodForm } from './CRUD/AddFood';
import { FoodInMeal } from './Food';
import style from './Meal.module.css';

export interface IMealProps {
    foods: [];
}

export function Meal({ foods }: IMealProps) {
    console.log(foods);
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
