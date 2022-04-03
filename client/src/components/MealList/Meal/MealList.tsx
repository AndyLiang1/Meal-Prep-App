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


const CREATE_MEAL = gql`
    mutation CREATE_MEAL($userId: ID!, $dayName: String!) {
        createMeal(userId: $userId, dayName: $dayName) {
            username
            id
            day1 {
                name
            }

        }
    }
`;

interface CreateMealArgs {
    userId: string, 
    dayName: string
}

interface newMeal {
    createMeal: Meal
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
    const dispatch = useDispatch()
    const {dayIndex} = useSelector((state:IRootState) => state.day)
    const { user } = useSelector((state: any) => state);
    // const [dayIndex, setDayIndex] = useState<number>(0);

    // const dispatch = useDispatch()

    const [createMeal, {data, loading, error} ] = useMutation(CREATE_MEAL)

    const addMeal = async() => {
        const {data} = await createMeal({
            variables: {
                userId: user.id,
                dayName: Days[dayIndex]
            }
        })
        // const { username, id, days } = userFromDb;
        // dispatch(
        //     addUserToStore({
        //         username,
        //         id,
        //         days,
        //         loggedIn: true,
        //         accessToken: localStorage.getItem('accessToken')!
        //     })
        // );
    };

    const changeDayIndex = (direction: string) => {
        if (direction === 'forward') {
            if (dayIndex === 6) {
                dispatch(changeDay({dayIndex: 0}));
                return;
            }
            dispatch(changeDay({dayIndex: dayIndex + 1}));
        } else {
            if (dayIndex === 0) {
                dispatch(changeDay({dayIndex: 6}));
                return;
            }
            dispatch(changeDay({dayIndex: dayIndex - 1}));
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
                    <button className={style.addMeal}
                        onClick = {() => addMeal()}
                    >Add Meal</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        
    );
}



