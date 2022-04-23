import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShorthandPropertyAssignment } from 'typescript';
import { CreateMealDocument, DeleteMealDocument, Food, GetMealsDocument, Meal, User } from '../../../generated/graphql-client';
import { addUserToStore, changeDay } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { defaultUserInfo } from '../../../state/reducers/UserData';
import { getUserMeals } from '../../helpers/GetMealsFunction';
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
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const { user } = useSelector((state: IRootState) => state);
    // const [dayIndex, setDayIndex] = useState<number>(0);

    // const dispatch = useDispatch()

    const [createMeal] = useMutation(CreateMealDocument);
    const [getMeals] = useLazyQuery(GetMealsDocument);

    const addMeal = async () => {
        try {
            console.log(user.id);
            console.log(dayIndex);
            const input = {
                userId: user.id,
                dayIndex,
                day1: dayIndex === 0,
                day2: dayIndex === 1,
                day3: dayIndex === 2,
                day4: dayIndex === 3,
                day5: dayIndex === 4,
                day6: dayIndex === 5,
                day7: dayIndex === 6
            };

            await createMeal({
                variables: input
            });
            const day = await getUserMeals(dayIndex, user, getMeals);

            dispatch(
                addUserToStore({
                    username: user.username,
                    id:user.id,
                    day,
                    loggedIn: true,
                    accessToken: localStorage.getItem('accessToken')!,
                    foodList: user.foodList
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    const changeDayIndex = (direction: string) => {
        if (direction === 'forward') {
            if (dayIndex === 6) {
                dispatch(changeDay({ dayIndex: 0 }));
                return;
            }
            dispatch(changeDay({ dayIndex: dayIndex + 1 }));
        } else {
            if (dayIndex === 0) {
                dispatch(changeDay({ dayIndex: 6 }));
                return;
            }
            dispatch(changeDay({ dayIndex: dayIndex - 1 }));
        }
    };
    // useEffect(() => {
    //     if (user) {
    //         setDay(user.days[dayIndex]);
    //     }
    // }, [dayIndex, user]);

    return (
        <div>
            {user.day ? (
                <div className={styles.container}>
                    <div className={styles.title_container}>
                        <button onClick={() => changeDayIndex('backward')}>Prev</button>
                        <div className={styles.dayName_container}>{Days[dayIndex]}</div>
                        <button onClick={() => changeDayIndex('forward')}>Next</button>
                    </div>

                    {/* <div className={style.dayName_container}>{user.days[dayIndex].name}</div>
                    {user.days[dayIndex].meals.map((meal: any) => {
                        return <MealInDay foods={meal.foods}></MealInDay>;
                    })} */}
                    <div className={styles.mealList_container}>
                        {user.day.map((meal: Meal, index: number) => {
                            return <MealInDay key = {index} foods={meal.foods} mealId={meal.id}></MealInDay>;
                        })}
                        <button className={styles.addMealBtn} onClick={() => addMeal()}>
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
