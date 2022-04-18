import * as React from 'react';
import styles from './Food.module.css';
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
                    <h1> {food.name}</h1>
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
                <h1>Cals: {food.calories}</h1>
                <div className={styles.right_smaller_data_container}></div>
                <h1>P: {food.proteins}</h1>
                <h1>C: {food.carbs}</h1>
                <h1>F: {food.fats}</h1>
            </div>
            {deleteModal ? <DeleteModal objectToDelete={'food'} setDeleteModal={setDeleteModal} mealId={mealId!} foodName={food.name}></DeleteModal> : null}
        </div>
    );
}
