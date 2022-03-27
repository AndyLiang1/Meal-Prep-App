import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealData } from '../components/MealData/MealsInDay';
import { Header } from '../components/Others/Header';
import { addUserToStore } from '../state/action-creators';
// import { login } from '../state/action-creators';
import { RootState } from '../state/reducers';
import { GetUserQuery, QueryGetUserArgs, Scalars, User } from '../types';
export interface IMealDataProps {}

const GET_USER = gql`
    query GetUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            username
            id
            days {
                name
                meals {
                    foods {
                        name
                        calories
                        proteins
                        carbs
                        fats
                        ingredients {
                            name
                            calories
                            proteins
                            carbs
                            fats
                        }
                    }
                }
            }
        }
    }
`;

export function UserData(props: IMealDataProps) {
    const userId: string = localStorage.getItem('id')!;
    const bob = {
        name: 'hi'
    }
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            getUserId: userId
        }
    });
    // const { loading, error, data } = useQuery(GET_USER, {
    //     variables: {
    //         getUserId: userId
    //     }
    // });
    useEffect(() => {
        if (loading) {
            console.log('loading');
        } else {
            console.log(data);
            const user: User = data.getUser
            const { username, id, days } = user;
            // add userData to store
            dispatch(
                addUserToStore({
                    username,
                    id,
                    days,
                    loggedIn: true,
                    accessToken: localStorage.getItem('accessToken')!
                })
            );
        }
    });
    return (
        <div>
            <Header></Header>
            <MealData></MealData>
        </div>
    );
}
