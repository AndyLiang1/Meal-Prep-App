import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore } from '../../state/action-creators';
import { defaultUserInfo } from '../../state/reducers/UserData';
import { Meal } from './Meal';
import style from './MealsInDay.module.css';

export interface IMealDataProps {}

export function MealData(props: IMealDataProps) {
    const { user } = useSelector((state: any) => state);
    const [dayIndex, setDayIndex] = useState<number>(0);
    const [day, setDay] = useState<any>();
    console.log(user.days[dayIndex]);

   

    return (
        <div>
            {user.loggedIn ? (
                <div className={style.container}>
                    <div className={style.dayName_container}>{user.days[dayIndex].name}</div>
                    {user.days[dayIndex].meals.map((meal: any) => {
                        return (
                            <Meal foods = {meal.foods}></Meal>
                        )
                    })}
                    <button className={style.addMeal}>Add Meal</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
