import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Food } from '../../generated/graphql-client';
import { IRootState } from '../../state/reducers';
import { FoodInMeal } from '../MealList/Meal/FoodInMeal';
import { FoodInFoodList } from './FoodInFoodList';
import styles from './FoodList.module.css'
export interface IFoodListProps {
}

export function FoodList (props: IFoodListProps) {
  const {user} = useSelector((state:IRootState) => state)
  useEffect(() => {
    // console.log(user);
  })
  return (
    <div className = {styles.container}>
      {user.foodList && user.foodList.map((food:Food, index: number) => {
        return <FoodInFoodList key = {index} food = {food}></FoodInFoodList>
        
      })}  
    </div>
  );
}
