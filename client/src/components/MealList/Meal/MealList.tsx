import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Food, Meal } from '../../../generated/graphql-client';
import { addUserToStore, changeDay } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { defaultUserInfo } from '../../../state/reducers/UserData';
import { MealInDay } from './MealInDay';
import style from './MealsInDay.module.css';

export interface IMealListProps {
    // getUser: any
}

// const CREATE_MEAL = gql`
//     mutation CREATE_MEAL($userId: ID!, $dayIndex: Int!) {
//         createMeal(userId: $userId, dayIndex: $dayIndex) {
//             username
//             day1 @include(if: $day1)
//             day2 @include(if: $day2)
//             day3 @include(if: $day3)
//             day4 @include(if: $day4)
//             day5 @include(if: $day5)
//             day6 @include(if: $day6)
//             day7 @include(if: $day7)
//         }
//     }
// `;

const CREATE_MEAL = gql`
    mutation CREATE_MEAL($userId: ID!, $dayIndex: Int!) {
        createMeal(userId: $userId, dayIndex: $dayIndex) {
            username
            id
            day4 {
                foods {
                    name
                    calories
                    proteins
                    fats
                    carbs
                }
            }
        }
    }
`;

interface CreateMealArgs {
    userId: string;
    dayName: string;
}

interface newMeal {
    createMeal: Meal;
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
    const { user } = useSelector((state: any) => state);
    // const [dayIndex, setDayIndex] = useState<number>(0);

    // const dispatch = useDispatch()

    const [createMeal, { data, loading, error }] = useMutation(CREATE_MEAL);

    const addMeal = async () => {
        try {
            console.log(user.id);
            console.log(dayIndex)
            const { data } = await createMeal({
                variables: {
                    userId: user.id,
                    dayIndex
                }
            });
            const { username, id } = data.createMeal;
            console.log(data);
            let day: Meal[] = [];
            switch (dayIndex) {
                case 0:
                    day = data.createMeal.day1;
                    break;
                case 1:
                    day = data.createMeal.day2;
                    break;
                case 2:
                    day = data.createMeal.day3;
                    break;
                case 3:
                    day = data.createMeal.day4;
                    break;
                case 4:
                    day = data.createMeal.day5;
                    break;
                case 5:
                    day = data.createMeal.day6;
                    break;
                case 6:
                    day = data.createMeal.day7;
                    break;
                default:
                    day = data.createMeal.day1;
                    break;
            }
            console.log(data.createMeal.day4);
            console.log(day);
            dispatch(
                addUserToStore({
                    username,
                    id,
                    day,
                    loggedIn: true,
                    accessToken: localStorage.getItem('accessToken')!
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
                <div className={style.container}>
                    <button onClick={() => changeDayIndex('forward')}>Next</button>
                    <button onClick={() => changeDayIndex('backward')}>Prev</button>
                    {/* <div className={style.dayName_container}>{user.days[dayIndex].name}</div>
                    {user.days[dayIndex].meals.map((meal: any) => {
                        return <MealInDay foods={meal.foods}></MealInDay>;
                    })} */}
                    <div className={style.dayName_container}>{Days[dayIndex]}</div>
                    {user.day.map((meal: any) => {
                        return <MealInDay foods={meal.foods}></MealInDay>;
                    })}
                    <button className={style.addMeal} onClick={() => addMeal()}>
                        Add Meal
                    </button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
