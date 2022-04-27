import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Food } from '../../generated/graphql-client';
import { setModalStatus } from '../../state/action-creators';
import { IRootState } from '../../state/reducers';
import { DeleteModal } from '../MealList/FormsAndModals/DeleteModal';
import styles from './FoodInFoodList.module.css';

export interface IFoodInFoodListProps {
    food: Food;
}

export function FoodInFoodList({ food }: IFoodInFoodListProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <div className={styles.title_container}>
                        <div title={food.name}>{food.name.length <= 20 ? food.name : food.name.substring(0, 18) + '...'}</div>
                    </div>
                    <div>Calories: {food.calories}</div>
                    <div>Given amount: {food.givenAmount}</div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.btn_container}>
                        <button>Edit</button>
                        <button
                            onClick={() => {
                                if (!modalStatus) {
                                    console.log(modalStatus);
                                    dispatch(setModalStatus(!modalStatus));
                                    setDeleteModal(true);
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    <div className={styles.right_smaller_data_container}></div>
                    <div>P: {food.proteins}</div>
                    <div>C: {food.carbs}</div>
                    <div>F: {food.fats}</div>
                </div>
            </div>
            {deleteModal ? <DeleteModal objectToDelete={'food'} setDeleteModal={setDeleteModal} foodName={food.name} fromWhere={'foodList'}></DeleteModal> : null}
        </>
    );
}
