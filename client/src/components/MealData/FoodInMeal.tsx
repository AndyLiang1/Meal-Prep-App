import * as React from 'react';
import style from './Food.module.css'
import {Food} from '../../generated/graphql-client'

export interface IFoodInMealProps {
    food: Food
}

export function FoodInMeal (props: IFoodInMealProps) {
  return (
    <div className = {style.container}>
      hello
    </div>
  );
}
