import * as React from 'react';
import { MealData } from '../MealData/MealsInDay';
import style from './Header.module.css'
export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className = {style.header}>
      <h1>Meal Prep App</h1>
    </div>
  );
}
