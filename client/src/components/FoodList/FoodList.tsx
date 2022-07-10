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
            <div className={styles.foodList_header}>Food List</div>
            <div className={styles.searchBar_container}>
                <SearchBar placeholder={'Food name'} data={user.foodList}></SearchBar>
            </div>
            <div className={styles.foodList}>
                {user.foodList &&
                    user.foodList.map((food: Food, index: number) => {
                        return <FoodInFoodList key={index} food={food}></FoodInFoodList>;
                    })}
                <div className={styles.foodList_create_btn}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                            width: '90%',
                            marginTop: '5px',
                            marginBottom: '10px',
                            fontSize: '14px'
                        }}
                        onClick={() => {
                            if (!modalStatus) {
                                dispatch(setModalStatus(true));
                                setAddFoodForm(true);
                            }
                        }}
                    >
                        Create Food
                    </button>
                </div>
            </div>
            {addFoodForm ? <AddFoodForm fromWhere="foodList" setAddFoodForm={setAddFoodForm}></AddFoodForm> : null}
        </div>
    );
}
