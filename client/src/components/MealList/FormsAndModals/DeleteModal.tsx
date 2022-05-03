import { useLazyQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteFoodDocument, DeleteMealDocument, GetMealsDocument, MutationDeleteFoodArgs } from '../../../generated/graphql-client';
import { addUserToStore, setModalStatus } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { getUserMeals } from '../../helpers/GetMealsFunction';
import styles from './DeleteModal.module.css';
export interface IDeleteModalProps {
    objectToDelete: string;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
    foodName?: string;
    fromWhere?: string;
}

export function DeleteModal({ objectToDelete, setDeleteModal, mealId, foodName, fromWhere }: IDeleteModalProps) {
    const { user } = useSelector((state: IRootState) => state);
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteMeal] = useMutation(DeleteMealDocument);
    const [getMeals] = useLazyQuery(GetMealsDocument);
    const [deleteFood] = useMutation(DeleteFoodDocument);
    const deleteUserObject = async () => {
        console.log(objectToDelete);
        if (fromWhere === 'mealList') {
            if (objectToDelete === 'meal' && mealId) {
                const deleteMealArgs = {
                    userId: user.id,
                    dayIndex,
                    mealId,
                    day1: dayIndex === 0,
                    day2: dayIndex === 1,
                    day3: dayIndex === 2,
                    day4: dayIndex === 3,
                    day5: dayIndex === 4,
                    day6: dayIndex === 5,
                    day7: dayIndex === 6
                };
                await deleteMeal({
                    variables: deleteMealArgs
                });
            } else if (objectToDelete === 'food' && mealId) {
                const deleteFoodArgs = {
                    userId: user.id,
                    dayIndex,
                    mealId,
                    foodName: foodName!,
                    day1: dayIndex === 0,
                    day2: dayIndex === 1,
                    day3: dayIndex === 2,
                    day4: dayIndex === 3,
                    day5: dayIndex === 4,
                    day6: dayIndex === 5,
                    day7: dayIndex === 6
                };
                await deleteFood({
                    variables: deleteFoodArgs
                });
            }
        } else if (fromWhere === 'foodList') {
             const deleteFoodArgs: MutationDeleteFoodArgs = {
                 userId: user.id,
                 dayIndex: null,
                 mealId: null,
                 foodName: foodName!,
                 day1: dayIndex === 0,
                 day2: dayIndex === 1,
                 day3: dayIndex === 2,
                 day4: dayIndex === 3,
                 day5: dayIndex === 4,
                 day6: dayIndex === 5,
                 day7: dayIndex === 6
             };
             await deleteFood({
                 variables: deleteFoodArgs
             });
        }

        const day = await getUserMeals(dayIndex, user, getMeals);

        dispatch(
            addUserToStore({
                username: user.username,
                id: user.id,
                day,
                loggedIn: true,
                accessToken: localStorage.getItem('accessToken')!,
                foodList: user.foodList
            })
        );
        setDeleteModal(false);
    };
    return (
        <div className={styles.container}>
            {fromWhere === 'mealList' && objectToDelete === 'meal' && <div>Are you sure you want to delete this meal?</div>}
            {fromWhere === 'mealList' && objectToDelete === 'food' && <div>Are you sure you want to delete this food from your meal?</div>}
            {fromWhere === 'foodList' && <div>Are you sure you want to delete this food? Doing so will delete this food from all meals too!</div>}
            <div className={styles.btn_container}></div>
            <button
                onClick={() => {
                    deleteUserObject();
                    dispatch(setModalStatus(false));
                }}
            >
                Yes
            </button>
            <button
                onClick={() => {
                    dispatch(setModalStatus(false));
                    setDeleteModal(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}