import { useLazyQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteMealDocument, GetMealsDocument } from '../../../generated/graphql-client';
import { addUserToStore } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { getUserMeals } from '../../helpers/GetMealsFunction';
import styles from './DeleteMealModal.module.css';
export interface IDeleteMealModalProps {
    setDeletingMealModal: React.Dispatch<React.SetStateAction<boolean>>;
    mealId: string;
}

export function DeleteMealModal({ setDeletingMealModal, mealId }: IDeleteMealModalProps) {
    const { user } = useSelector((state: IRootState) => state);
    const { dayIndex } = useSelector((state: IRootState) => state.day);

    const dispatch = useDispatch();

    const [deleteMeal] = useMutation(DeleteMealDocument);
    const [getMeals] = useLazyQuery(GetMealsDocument);

    const deleteUserMeal = async () => {
        const input = {
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
            variables: input
        });
        const day = await getUserMeals(dayIndex, user, getMeals);

        dispatch(
            addUserToStore({
                username: user.username,
                id: user.id,
                day,
                loggedIn: true,
                accessToken: localStorage.getItem('accessToken')!
            })
        );
    };
    return (
        <div className={styles.container}>
            <div className={styles.btn_container}></div>
            <button onClick={() => deleteUserMeal()}>Yes</button>
            <button onClick={() => setDeletingMealModal(false)}>Cancel</button>
        </div>
    );
}
