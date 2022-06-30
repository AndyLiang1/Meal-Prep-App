import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Food } from '../../generated/graphql-client';
import { IRootState } from '../../state/reducers';
// import { FoodInMeal } from '../MealList/Meal/FoodInMeal';
// import { FoodInFoodList } from './FoodInFoodList';
import styles from './FoodList.module.css';
// import { SearchBar } from './SearchBar';
export interface IFoodListProps {}

export function FoodList(props: IFoodListProps) {
    const { user } = useSelector((state: IRootState) => state);
    useEffect(() => {
        // console.log(user);
    });
    return (
        <div className={styles.container}>
            <div className={styles.foodList_header}>Food List</div>
            <div className={styles.searchBar_container}>{/* <SearchBar placeholder={'Food name'} data={user.foodList}></SearchBar> */}</div>
            <div className={styles.foodList}>
                {/* {user.foodList &&
                    user.foodList.map((food: Food, index: number) => {
                        return <FoodInFoodList key={index} food={food}></FoodInFoodList>;
                    })} */}
            </div>
        </div>
    );
}
