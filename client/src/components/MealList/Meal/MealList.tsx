import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateMealListFoodDocument, CreateMealListMealDocument, Food, GetMealListMealsDocument, Meal, User } from '../../../generated/graphql-client';
import { totalStats } from '../../../pages/UserPage';
import { addUserToStore, changeDay, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { defaultUserInfo } from '../../../state/reducers/UserData';
import { LeftBtn, RightBtn } from '../../helpers/Icons';
import { MealListMeal } from './MealListMeal';
import styles from './MealList.module.css';

export interface IMealListProps {
    totalStats: totalStats | null;
    mealStats: totalStats[];
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

export function MealList({ totalStats, mealStats }: IMealListProps) {
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
            console.error(error);
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
        <div className={styles.container}>
            {user.day ? (
                <div className={styles.inner_container}>
                    <div className={styles.title_container}>
                        <div className={styles.title}>Meal List</div>
                        <div className={styles.day_container}>
                            <div className={styles.btn_container}>
                                <LeftBtn type="button" className={styles.left_btn} onClick={() => changeDayIndex('backward')}>
                                    Prev
                                </LeftBtn>
                            </div>
                            <div className={styles.dayName_container}>{Days[dayIndex]}</div>
                            <div className={styles.btn_container}>
                                <RightBtn type="button" className={styles.right_btn} onClick={() => changeDayIndex('forward')}>
                                    Next
                                </RightBtn>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mealList_container}>
                        <div className={styles.inner_container}>
                            {user.day.map((meal: Meal, index: number) => {
                                return (
                                    <div className={styles.meal_container}>
                                        <MealListMeal key={index} meal={meal} mealStats={mealStats}></MealListMeal>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.total_stats_container}>
                        <div className={styles.total_stats_description}>Total:</div>
                        <div className={styles.total_stats_inner_container}>
                            {totalStats && (
                                <div className={styles.total_stats}>
                                    <div className={styles.stats}>CALS: {totalStats.calories.toFixed(0)}</div>
                                    <div className={styles.stats}>
                                        PRTS: {totalStats.proteins.toFixed(2)} ({((totalStats.proteins / totalStats.calories)*100).toFixed(0)}%)
                                    </div>
                                    <div className={styles.stats}>
                                        CRBS: {totalStats.carbs.toFixed(2)} ({((totalStats.carbs / totalStats.calories)*100).toFixed(0)}%)
                                    </div>
                                    <div className={styles.stats}>
                                        FATS: {totalStats.fats.toFixed(2)} ({((totalStats.fats / totalStats.calories)*100).toFixed(0)}%)
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className={styles.btn} onClick={() => addMeal()}>
                            Add Meal
                        </button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
