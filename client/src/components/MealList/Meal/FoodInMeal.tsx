import * as React from 'react';
import styles from './FoodInMeal.module.css';
import { Food } from '../../../generated/graphql-client';
import { DeleteModal } from '../FormsAndModals/DeleteModal';
import { IRootState } from '../../../state/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setModalStatus } from '../../../state/action-creators';

export interface IFoodInMealProps {
    food: Food;
    mealId?: string;
}

export function FoodInMeal({ food, mealId }: IFoodInMealProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <div className={styles.title_container}>
                    <div> {food.name}</div>
                </div>
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
            </div>
            <div className={styles.right_container}>
                <div>Cals: {food.calories}</div>
                <div className={styles.right_smaller_data_container}></div>
                <div>P: {((food.proteins * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
                <div>C: {((food.carbs * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
                <div>F: {((food.fats * food.actualAmount) / food.givenAmount).toFixed(1)}</div>
            </div>
            {deleteModal ? <DeleteModal objectToDelete={'food'} setDeleteModal={setDeleteModal} mealId={mealId!} foodName={food.name}></DeleteModal> : null}
        </div>
    );
}
