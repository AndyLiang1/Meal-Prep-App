import * as React from 'react';
import style from './Food.module.css'
import {Food} from '../../../generated/graphql-client'

export interface IFoodInMealProps {
    food: Food
}

export function FoodInMeal ({food}: IFoodInMealProps) {

  return (
    <div className = {style.container}>
      <div className = {style.name_container}>
          <h1>Name: {food.name}</h1>
      </div>
      <div className = {style.stats_container}>
          <h1>Calories: {food.calories}</h1>
          <h1>Proteins: {food.proteins}</h1>
          <h1>Carbs: {food.carbs}</h1>
          <h1>Fats: {food.fats}</h1>
      </div>
      
    </div>
  );
}
