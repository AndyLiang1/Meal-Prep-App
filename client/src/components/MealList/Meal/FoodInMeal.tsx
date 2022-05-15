import * as React from 'react';
import styles from './FoodInMeal.module.css';
import { Food } from '../../../generated/graphql-client';
import { DeleteModal } from '../FormsAndModals/DeleteModal';
import { IRootState } from '../../../state/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setModalStatus } from '../../../state/action-creators';
import { DeleteBtn, EditBtn } from '../../helpers/Icons';
import { EditFoodForm } from '../FormsAndModals/EditFoodForm';

export interface IFoodInMealProps {
    food: Food;
    mealId?: string;
    foodIndex: number;
}

export function FoodInMeal({ food, mealId, foodIndex }: IFoodInMealProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    const [editForm, setEditForm] = useState(false);

    let unMounted = false;

    useEffect(() => {
        return () => {
            unMounted = true;
        };
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <div className={styles.title_container}>
                    <div className={styles.food_name}>
                        <div title={food.name}>{food.name.length <= 33 ? food.name : food.name.substring(0, 30) + '...'}</div>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <EditBtn
                        className={styles.btn}
                        onClick={() => {
                            if (!modalStatus) {
                                dispatch(setModalStatus(true));
                                setEditForm(true);
                            }
                        }}
                    >
                        Edit
                    </EditBtn>
                    <DeleteBtn
                        className={styles.btn}
                        onClick={() => {
                            if (!unMounted) {
                                if (!modalStatus) {
                                    dispatch(setModalStatus(true));
                                    setDeleteModal(true);
                                }
                            }
                        }}
                    >
                        Delete
                    </DeleteBtn>
                </div>
            </div>
            <div className={styles.right_container}>
                <div className={styles.food_stats}>Cals: {((food.calories * food.actualAmount) / food.givenAmount).toFixed(0)}</div>
                <div className={styles.right_smaller_data_container}></div>
                <div className={styles.food_stats}>P: {((food.proteins * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
                <div className={styles.food_stats}>C: {((food.carbs * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
                <div className={styles.food_stats}>F: {((food.fats * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
            </div>
            {deleteModal ? (
                <DeleteModal objectToDelete={'food'} setDeleteModal={setDeleteModal} mealId={mealId!} foodName={food.name} foodIndex={foodIndex} fromWhere={'mealList'}></DeleteModal>
            ) : null}
            {editForm ? <EditFoodForm fromWhere={'mealList'} food={food} setEditForm={setEditForm} mealId={mealId!} foodIndex={foodIndex}></EditFoodForm> : null}
        </div>
    );
}
