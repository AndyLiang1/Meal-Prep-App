import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Food, Meal, DeleteMealDocument } from '../../../generated/graphql-client';
import { setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { AddBtn, DeleteBtn } from '../../helpers/Icons';
import { AddFoodForm } from '../FormsAndModals/AddFoodForm';
import { DeleteModal } from '../FormsAndModals/DeleteModal';
import { EditFoodForm } from '../FormsAndModals/EditFoodForm';
import { FoodInMeal } from './FoodInMeal';
import styles from './MealInDay.module.css';

export interface IMealInDayProps {
    foods: Food[];
    mealId: string;
}

export function MealInDay({ foods, mealId }: IMealInDayProps) {
    const [addFoodForm, setAddFoodForm] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <div className={styles.foods_container}>
                {foods.map((food: any, index: number) => {
                    return <FoodInMeal key={index} mealId={mealId} food={food} foodIndex = {index}></FoodInMeal>;
                })}
            </div>
            <div className={styles.btn_container}>
                <AddBtn
                    className={styles.btn}
                    onClick={() => {
                        if (!modalStatus) {
                            dispatch(setModalStatus(true));
                            setAddFoodForm(true);
                        }
                    }}
                >
                    Add food
                </AddBtn>
                <DeleteBtn
                    className={styles.btn}
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
            {addFoodForm ? <AddFoodForm type="meal" setAddFoodForm={setAddFoodForm} mealId={mealId}></AddFoodForm> : null}
            {deleteModal ? <DeleteModal objectToDelete={'meal'} setDeleteModal={setDeleteModal} mealId={mealId} fromWhere={'mealList'}></DeleteModal> : null}
         
        </div>
    );
}
