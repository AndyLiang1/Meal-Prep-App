import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealList } from '../components/MealList/Meal/MealList';
import { Header } from '../components/Others/Header';
import { Meal, Query, User } from '../generated/graphql-client';
import { addUserToStore, changeDay } from '../state/action-creators';
// import { login } from '../state/action-creators';
import { IRootState } from '../state/reducers';
import { useState } from 'react';
import { AnyARecord } from 'dns';
import { GET_USER } from './GetUserQuery';
export interface IUserPageProps {}

interface GetUserArgs {
    getUserId: string;
    day1: boolean;
    day2: boolean;
    day3: boolean;
    day4: boolean;
    day5: boolean;
    day6: boolean;
    day7: boolean;
}

interface GetUserRetVal {
    getUser: User;
}


export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    // console.log(dayIndex);
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const dispatch = useDispatch();
    console.log(dayIndex);
    const { loading, error, data } = useQuery<GetUserRetVal, GetUserArgs>(GET_USER, {
        variables: {
            getUserId: userId,
            day1: dayIndex === 0,
            day2: dayIndex === 1,
            day3: dayIndex === 2,
            day4: dayIndex === 3,
            day5: dayIndex === 4,
            day6: dayIndex === 5,
            day7: dayIndex === 6
        }
    });
    const foo = () => {
        dispatch(changeDay({dayIndex: dayIndex + 1}))
    }

    useEffect(() => {
        if (loading) {
        } else {
            const user = data!.getUser;
            const { username, id } = user;

            let day: Meal[] = [];
            switch (dayIndex) {
                case 0:
                    day = user.day1;
                    break;
                case 1:
                    day = user.day2;
                    break;
                case 2:
                    day = user.day3;
                    break;
                case 3:
                    day = user.day4;
                    break;
                case 4:
                    day = user.day5;
                    break;
                case 5:
                    day = user.day6;
                    break;
                case 6:
                    day = user.day7;
                    break;
                default:
                    day = user.day1;
                    break;
            }
            // add userData to store
            // probably dont need this anymore due to the fact
            // we dont need to pass around "days" from prev
            // schema
            dispatch(
                addUserToStore({
                    username,
                    id,
                    day,
                    loggedIn: true,
                    accessToken: localStorage.getItem('accessToken')!
                })
            );
        }
    });
    return (
        <div>
            <Header></Header>
            <MealList></MealList>
            <button onClick = {() => foo()}>yyyyyy</button>
        </div>
    );
}
