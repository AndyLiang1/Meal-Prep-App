import * as React from 'react';
import { Food } from '../../../generated/graphql-client';

export interface IIngredientProps {
    ingredient: Food
}

export function Ingredient ({ingredient}: IIngredientProps) {
  return (
    <div>
      <div>{ingredient.name}</div>
      <button>X</button>
    </div>
  );
}
