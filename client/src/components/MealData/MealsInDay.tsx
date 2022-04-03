import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Day, Food, Meal } from '../../generated/graphql-client';
import { addUserToStore } from '../../state/action-creators';
import { defaultUserInfo } from '../../state/reducers/UserData';
import { MealInDay } from './MealInDay';
import style from './MealsInDay.module.css';

export interface IMealDataProps {}

export function MealData(props: IMealDataProps) {
    const { user } = useSelector((state: any) => state);
    const [dayIndex, setDayIndex] = useState<number>(0);
    const [day, setDay] = useState<Day>(user.days[0]);
    console.log(user.days[dayIndex]);

    const addMeal = () => {
        
    };

    const changeDay = (direction: string) => {
        if (direction === 'forward') {
            if (dayIndex === 6) {
                setDayIndex(0);
                return;
            }
            setDayIndex(dayIndex + 1);
        } else {
            if (dayIndex === 0) {
                setDayIndex(6);
                return;
            }
            setDayIndex(dayIndex - 1);
        }
    };
    useEffect(() => {
        if (user) {
            setDay(user.days[dayIndex]);
        }
    }, [dayIndex, user]);

    return (
        <div>
            {day ? (
                <div className={style.container}>
                    <button onClick={() => changeDay('forward')}>Next</button>
                    <button onClick={() => changeDay('backward')}>Prev</button>
                    {/* <div className={style.dayName_container}>{user.days[dayIndex].name}</div>
                    {user.days[dayIndex].meals.map((meal: any) => {
                        return <MealInDay foods={meal.foods}></MealInDay>;
                    })} */}
                    <div className={style.dayName_container}>{day.name}</div>
                    {day.meals.map((meal: any) => {
                        return <MealInDay foods={meal.foods}></MealInDay>;
                    })}
                    <button className={style.addMeal}>Add Meal</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
