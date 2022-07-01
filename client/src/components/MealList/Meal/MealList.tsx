import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShorthandPropertyAssignment } from 'typescript';
import { CreateMealListFoodDocument, Food, GetMealListMealsDocument, Meal, User } from '../../../generated/graphql-client';
import { addUserToStore, changeDay } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { defaultUserInfo } from '../../../state/reducers/UserData';
import { MealInDay } from './MealInDay';
import styles from './MealList.module.css';

export interface IMealListProps {
    // getUser: any
}

enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export function MealList(Props: IMealListProps) {
    const dispatch = useDispatch();
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const user = useSelector((state: IRootState) => state.user);
    const refetchTrigger = useSelector((state: IRootState) => state.refetchTrigger);
    const [refresh, setRefresh] = useState(false);
    // const [dayIndex, setDayIndex] = useState<number>(0);
    // const dispatch = useDispatch()

    // const [createMeal] = useMutation(CreateMealDocument);
    // const [getMeals] = useLazyQuery(GetMealsDocument);

    const addMeal = async () => {
        // try {
        //     const createMealInput = {
        //         userId: user.id,
        //         dayIndex
        //     };
        //     await createMeal({
        //         variables: {
        //             input: createMealInput
        //         }
        //     });
        //     const day = await getUserMeals(dayIndex, user, getMeals);
        //     dispatch(
        //         addUserToStore({
        //             username: user.username,
        //             id: user.id,
        //             day,
        //             loggedIn: true,
        //             accessToken: localStorage.getItem('accessToken')!,
        //             foodList: user.foodList
        //         })
        //     );
        //     // setRefetchUserDataTrigger(!refetchUserDataTrigger)
        // } catch (error) {
        //     console.log(error);
        // }
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
                        <button onClick={() => changeDayIndex('backward')}>Prev</button>
                        <div className={styles.dayName_container}>{Days[dayIndex]}</div>
                        <button onClick={() => changeDayIndex('forward')}>Next</button>
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
                        // className={styles.addMealBtn} 
                        onClick={() => addMeal()}>
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
