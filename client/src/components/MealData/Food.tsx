import * as React from 'react';
import style from './Food.module.css'
import {Food} from '../../generated/graphql-client'

export interface IFoodProps {
    food: Food
}

export function FoodInMeal (props: IFoodProps) {
  return (
    <div className = {style.container}>
      hello
    </div>
  );
}
