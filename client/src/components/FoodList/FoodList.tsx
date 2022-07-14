import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Food } from '../../generated/graphql-client';
import { setModalStatus } from '../../state/action-creators';
import { IRootState } from '../../state/reducers';
import { AddFoodForm } from '../MealList/FormsAndModals/AddFoodForm';
// import { MealListFood } from '../MealList/Meal/MealListFood';
import { FoodInFoodList } from './FoodInFoodList';
import styles from './FoodList.module.css';
import { SearchBar } from './SearchBar';
export interface IFoodListProps {}

export function FoodList(props: IFoodListProps) {
    const { user } = useSelector((state: IRootState) => state);
    const [addFoodForm, setAddFoodForm] = useState(false);
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <div className={styles.title}>Food List</div>
                <div className={styles.searchBar_container}>
                    {/* <SearchBar placeholder={'Food name'} data={user.foodList}></SearchBar> */}
                </div>
            </div>

            <div className={styles.foodList_container}>
                <div className={styles.stat_container}>
                    <div className={styles.title_inner_container}>
                        <div className={styles.stat_header}>CALS</div>
                        <div className={styles.stat_header}>PRTS</div>
                        <div className={styles.stat_header}>CRBS</div>
                        <div className={styles.stat_header}>FATS</div>
                        <div className={styles.btn_container}>
                            <button
                                type="button"
                                className={styles.btn}
                                onClick={() => {
                                    if (!modalStatus) {
                                        dispatch(setModalStatus(true));
                                        setAddFoodForm(true);
                                    }
                                }}
                            >
                                Add Food
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.foodList}>
                    {user.foodList &&
                        user.foodList.map((food: Food, index: number) => {
                            return (
                                <div className={styles.food}>
                                    <FoodInFoodList key={index} food={food}></FoodInFoodList>
                                </div>
                            );
                        })}
                </div>
            </div>
            {addFoodForm ? <AddFoodForm fromWhere="foodList" setAddFoodForm={setAddFoodForm}></AddFoodForm> : null}
        </div>
    );
}
