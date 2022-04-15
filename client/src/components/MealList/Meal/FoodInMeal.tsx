import * as React from 'react';
import styles from './Food.module.css'
import {Food} from '../../../generated/graphql-client'

export interface IFoodInMealProps {
    food: Food
}

export function FoodInMeal ({food}: IFoodInMealProps) {

  return (
      <div className={styles.container}>
          <div className={styles.left_container}>
              <h1> {food.name}</h1>
          </div>
          <div className={styles.right_container}>
              <h1>Cals: {food.calories}</h1>
              <div className={styles.right_smaller_data_container}>

              </div>
              <h1>P: {food.proteins}</h1>
              <h1>C: {food.carbs}</h1>
              <h1>F: {food.fats}</h1>
          </div>
      </div>
  );
}
