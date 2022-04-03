import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealList } from '../components/MealList/Meal/MealList';
import { Header } from '../components/Others/Header';
import { Meal, Query, User } from '../generated/graphql-client';
import { addUserToStore, changeDay } from '../state/action-creators';
import { GET_DAY1, GET_DAY2, GET_DAY3, GET_DAY4, GET_DAY5, GET_DAY6, GET_DAY7 } from './GetDay';
// import { login } from '../state/action-creators';
import { IRootState } from '../state/reducers';
import { useState } from 'react';
import { AnyARecord } from 'dns';
export interface IUserPageProps {}

interface GetUserParams {
    getUserId: string;
}

interface UserData {
    getUser: User;
}

const listOfQueries = [GET_DAY1, GET_DAY2, GET_DAY3, GET_DAY4, GET_DAY5, GET_DAY6, GET_DAY7];

export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    // console.log(dayIndex);
    const { dayIndex } = useSelector((state: IRootState) => state.day);
    const dispatch = useDispatch();
    console.log(dayIndex);
    const { loading, error, data } = useQuery<UserData, GetUserParams>(listOfQueries[dayIndex], {
        variables: {
            getUserId: userId
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
