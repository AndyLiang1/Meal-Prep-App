import * as React from 'react';
import { FoodInterface } from '../../state/helpers/IFood';
import style from './Food.module.css'

export interface IFoodProps {
    food: FoodInterface
}

export function Food (props: IFoodProps) {
  return (
    <div className = {style.container}>
      hello
    </div>
  );
}
