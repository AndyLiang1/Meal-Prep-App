import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Food } from '../../generated/graphql-client';
import { setModalStatus } from '../../state/action-creators';
import { IRootState } from '../../state/reducers';
import { DeleteBtn, EditBtn } from '../helpers/Icons';
import { DeleteModal } from '../MealList/FormsAndModals/DeleteModal';
import { EditFoodForm } from '../MealList/FormsAndModals/EditFoodForm';
import styles from './FoodInFoodList.module.css';

export interface IFoodInFoodListProps {
    food: Food;
}

export function FoodInFoodList({ food }: IFoodInFoodListProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    const [editForm, setEditForm] = useState(false);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <strong title={food.name}>{food.name.length <= 35 ? food.name : food.name.substring(0, 33) + '...'}</strong>
                </div>
                <div className={styles.stats_container}>
                    <div>Given Amount: {food.givenAmount}</div>
                    <div>Cals: {food.calories}</div>
                    <div>P: {food.proteins}</div>
                    <div>C: {food.carbs}</div>
                    <div>F: {food.fats}</div>
                </div>
                <div className={styles.btn_container}>
                    <EditBtn
                        onClick={() => {
                            if (!modalStatus) {
                                console.log(modalStatus);
                                dispatch(setModalStatus(!modalStatus));
                                setEditForm(true);
                            }
                        }}
                    >
                        Edit
                    </EditBtn>
                    <DeleteBtn
                        onClick={() => {
                            if (!modalStatus) {
                                console.log(modalStatus);
                                dispatch(setModalStatus(!modalStatus));
                                setDeleteModal(true);
                            }
                        }}
                    >
                        Delete
                    </DeleteBtn>
                </div>
            </div>
            {deleteModal ? <DeleteModal objectToDelete={'food'} setDeleteModal={setDeleteModal} foodName={food.name} fromWhere={'foodList'}></DeleteModal> : null}
            {editForm ? <EditFoodForm fromWhere={'foodList'} food={food} setEditForm={setEditForm}></EditFoodForm> : null}
        </>
    );
}
