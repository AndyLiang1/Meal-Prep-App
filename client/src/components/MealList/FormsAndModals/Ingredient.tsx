import * as React from 'react';
import { Food } from '../../../generated/graphql-client';

export interface IIngredientProps {
    ingredient: Food;
    ingredients: Food[];
    setIngredients: React.Dispatch<React.SetStateAction<Food[]>>;
}

export function Ingredient({ ingredient, ingredients, setIngredients }: IIngredientProps) {
  
    const deleteIngredient = (ingredientToDeleteName: string) => {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredientToDeleteName === ingredients[i].name) {
                // critical to do this instead of setting
                // newIngredientsList = ingredients to trigger a re-render
                const newIngredientsList = [...ingredients] 
                newIngredientsList.splice(i, 1);
                setIngredients(newIngredientsList)
            }
        }
    };
    return (
        <div>
            <div>{ingredient.name}</div>
            <button onClick={() => deleteIngredient(ingredient.name)}>X</button>
        </div>
    );
}
