import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Food, Meal } from '../../../generated/graphql-client';
import { totalStats } from '../../../pages/UserPage';
// import { Food, Meal, DeleteMealDocument } from '../../../generated/graphql-client';
import { setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { AddBtn, DeleteBtn } from '../../helpers/Icons';
import { AddFoodForm } from '../FormsAndModals/AddFoodForm';
import { DeleteModal } from '../FormsAndModals/DeleteModal';
// import { EditFoodForm } from '../FormsAndModals/EditFoodForm';
import { MealListFood } from './MealListFood';
import styles from './MealListMeal.module.css';

export interface IMealListMealProps {
    meal: Meal;
    mealStats: totalStats[];
}

export function MealListMeal({ meal, mealStats }: IMealListMealProps) {
    const [addFoodForm, setAddFoodForm] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <div className={styles.title}>{meal.name}</div>
                <div className={styles.total_stats}>CALS: {mealStats[meal.index]?.calories.toFixed(0)}</div>
                <div className={styles.total_stats}>PRTS: {mealStats[meal.index]?.proteins.toFixed(2)}</div>
                <div className={styles.total_stats}>CRBS: {mealStats[meal.index]?.carbs.toFixed(2)}</div>
                <div className={styles.total_stats}>FATS: {mealStats[meal.index]?.fats.toFixed(2)}</div>
                <div className={styles.title_btn_container}>
                    <DeleteBtn
                        type="button"
                        className={styles.delete_btn}
                        onClick={() => {
                            if (!modalStatus) {
                                dispatch(setModalStatus(true));
                                setDeleteModal(true);
                            }
                        }}
                    >
                        Delete Meal
                    </DeleteBtn>
                </div>
            </div>
            <div className={styles.content_container}>
                <div className={styles.background_top}></div>
                <div className={styles.background_bottom}></div>
                <div className={styles.foods_container}>
                    {meal.foods.map((food: any, index: number) => {
                        return <MealListFood key={index} mealId={meal.id} food={food} foodIndex={index}></MealListFood>;
                    })}
                </div>
                <div className={styles.btn_container}>
                    <AddBtn
                        type="button"
                        className={styles.add_btn}
                        onClick={() => {
                            if (!modalStatus) {
                                dispatch(setModalStatus(true));
                                setAddFoodForm(true);
                            }
                        }}
                    >
                        Add food
                    </AddBtn>
                    {/* <DeleteBtn
                    type="button"
                    className={styles.btn}
                    onClick={() => {
                        if (!modalStatus) {
                            dispatch(setModalStatus(true));
                            setDeleteModal(true);
                        }
                    }}
                >
                    Delete Meal
                </DeleteBtn> */}
                </div>
            </div>

            {addFoodForm ? <AddFoodForm fromWhere="mealList" setAddFoodForm={setAddFoodForm} mealId={meal.id}></AddFoodForm> : null}
            {deleteModal ? <DeleteModal deleteType={'mealListMeal'} setDeleteModal={setDeleteModal} mealId={meal.id}></DeleteModal> : null}
        </div>
    );
}
