import * as React from 'react';
import { Food } from '../../../generated/graphql-client';
import styles from './DropdownStats.module.css';

export interface IDropdownStatsProps {
    statName: keyof Food;
    ingredients: Food[];
}

export function DropdownStats({ statName, ingredients }: IDropdownStatsProps) {
    React.useEffect(() => {
        console.log(ingredients[0]);
    });
    return (
        <div>
            {ingredients.map((food: Food) => {
                return (
                    <div className={styles.container}>
                        <div className={styles.food_info_name}>{food.name.length > 14 ? food.name.substring(0, 13) + '...' : food.name}</div>
                        <div className={styles.food_info_stat}>
                            {statName === 'calories'
                                ? (((food[statName] as number) * food.actualAmount!) / food.givenAmount).toFixed(0)
                                : (((food[statName] as number) * food.actualAmount!) / food.givenAmount).toFixed(2)}
                        </div>
                        <div className={styles.food_info_amounts}>
                            Actual / Given : {food.actualAmount} / {food.givenAmount}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
