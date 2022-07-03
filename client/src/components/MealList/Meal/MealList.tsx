import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateMealListFoodDocument, CreateMealListMealDocument, Food, GetMealListMealsDocument, Meal, User } from '../../../generated/graphql-client';
import { totalStats } from '../../../pages/UserPage';
import { addUserToStore, changeDay, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { defaultUserInfo } from '../../../state/reducers/UserData';
import { LeftBtn, RightBtn } from '../../helpers/Icons';
import { MealInDay } from './MealInMealList';
import styles from './MealList.module.css';

export interface IMealListProps {
    totalStats: totalStats | null;
}

enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export function MealList({ totalStats }: IMealListProps) {
    const dispatch = useDispatch();
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const user = useSelector((state: IRootState) => state.user);

    const [createMeal] = useMutation(CreateMealListMealDocument);

    const addMeal = async () => {
        try {
            await createMeal({
                variables: {
                    dayIndex
                }
            });
            dispatch(triggerRefetch());
        } catch (error) {
            console.log(error);
        }
    };

    const changeDayIndex = (direction: string) => {
        if (direction === 'forward') {
            if (dayIndex === 6) {
                dispatch(changeDay(0));
                return;
            }
            dispatch(changeDay(dayIndex + 1));
        } else {
            if (dayIndex === 0) {
                dispatch(changeDay(6));
                return;
            }
            dispatch(changeDay(dayIndex - 1));
        }
    };

    return (
        <div>
            {user.day ? (
                <div className={styles.container}>
                    <div className={styles.title_container}>
                        <LeftBtn type="button" className={styles.left_btn} onClick={() => changeDayIndex('backward')}>
                            Prev
                        </LeftBtn>
                        <div className={styles.dayName_container}>{Days[dayIndex]}</div>
                        <RightBtn type="button" className={styles.right_btn} onClick={() => changeDayIndex('forward')}>
                            Next
                        </RightBtn>
                    </div>

                    <div className={styles.mealList_container}>
                        {user.day.map((meal: Meal, index: number) => {
                            return (
                                <div className={styles.meal}>
                                    <MealInDay key={index} foods={meal.foods} mealId={meal.id}></MealInDay>;
                                </div>
                            );
                        })}
                        <button
                            style={{
                                width: '100%',
                                marginTop: '5px',
                                marginBottom: '5px',
                                fontSize: '14px'
                            }}
                            className="btn btn-primary"
                            onClick={() => addMeal()}
                        >
                            Add Meal
                        </button>
                    </div>
                    <div className={styles.total_stats_container}>
                        <div className={styles.total_stats_description}>Day Total</div>
                        {totalStats && (
                            <>
                                <div className={styles.stats}>Cals: {totalStats.calories.toFixed(0)}</div>
                                <div className={styles.stats}>P: {totalStats.proteins.toFixed(2)}</div>
                                <div className={styles.stats}>C: {totalStats.carbs.toFixed(2)}</div>
                                <div className={styles.stats_last}>F: {totalStats.fats.toFixed(2)}</div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
