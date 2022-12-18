import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Food } from '../../generated/graphql-client';
import { setModalStatus } from '../../state/action-creators';
import { IRootState } from '../../state/reducers';
import { DeleteBtn, EditBtn } from '../helpers/Icons';
import { DeleteModal } from '../MealList/FormsAndModals/DeleteModal';
import { EditFoodForm } from '../MealList/FormsAndModals/EditFoodForm';
// import { EditFoodForm } from '../MealList/FormsAndModals/EditFoodForm';
import styles from './FoodInFoodList.module.css';

export interface IFoodInFoodListProps {
    food: Food;
}

export function FoodInFoodList({ food }: IFoodInFoodListProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    const [editFoodForm, setEditFoodForm] = useState(false);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <strong className = {styles.food_name} title={food.name}>{food.name.length <= 35 ? food.name : food.name.substring(0, 33) + '...'}</strong>
                    <div className={styles.given_amount}>Given Amt: {food.givenAmount.toFixed(2)}</div>
                </div>
                <div className={styles.content_container}>
                    <div className={styles.stats_container}>
                        <div className={styles.stats_odd}>{food.calories.toFixed(0)}</div>
                        <div className={styles.stats_even}>{food.proteins.toFixed(2)}</div>
                        <div className={styles.stats_odd}>{food.carbs.toFixed(2)}</div>
                        <div className={styles.stats_even}>{food.fats.toFixed(2)}</div>
                    </div>
                    <div className={styles.btn_container}>
                        <EditBtn
                            type="button"
                            className={styles.button}
                            onClick={() => {
                                if (!modalStatus) {
                                    dispatch(setModalStatus(!modalStatus));
                                    setEditFoodForm(true);
                                }
                            }}
                        />
                        <DeleteBtn
                            type="button"
                            className={styles.button}
                            onClick={() => {
                                if (!modalStatus) {
                                    dispatch(setModalStatus(!modalStatus));
                                    setDeleteModal(true);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {deleteModal ? <DeleteModal deleteType={'foodList'} setDeleteModal={setDeleteModal} foodName={food.name}></DeleteModal> : null}
            {editFoodForm ? <EditFoodForm fromWhere={'foodList'} food={food} setEditFoodForm={setEditFoodForm}></EditFoodForm> : null}
        </>
    );
}