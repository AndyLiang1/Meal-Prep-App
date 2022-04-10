import * as React from 'react';
import styles from './FoodList.module.css'
export interface IFoodListProps {
}

export function FoodList (props: IFoodListProps) {
  return (
    <div className = {styles.container}>
      This is a food list  
    </div>
  );
}
