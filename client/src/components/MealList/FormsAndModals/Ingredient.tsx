import * as React from 'react';
import { useEffect } from 'react';
import { Food } from '../../../generated/graphql-client';
import { CloseBtn } from '../../helpers/Icons';
import styles from './Ingredient.module.css';
export interface IIngredientProps {
    ingredient: Food;
    onDeleteIng: any;
}

export function Ingredient({ onDeleteIng, ingredient }: IIngredientProps) {
    return (
        <div className={styles.container}>
            <div className={styles.food_info_name}>{ingredient.name.length > 14 ? ingredient.name.substring(0, 13) + '...' : ingredient.name}</div>
            <div className={styles.food_info_amounts}>
                Actual / Given : {ingredient.actualAmount} / {ingredient.givenAmount}
            </div>
            <div className={styles.close_btn_container}>
                <CloseBtn className={styles.close_btn} type="button" onClick={() => onDeleteIng(ingredient.name, ingredient.actualAmount!)}></CloseBtn>
            </div>
        </div>
    );
}
