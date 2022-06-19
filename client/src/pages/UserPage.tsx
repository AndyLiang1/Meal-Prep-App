import { gql, useLazyQuery, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealList } from '../components/MealList/Meal/MealList';
import { Header } from '../components/Others/Header';
import { addUserToStore, changeDay } from '../state/action-creators';
import { IRootState } from '../state/reducers';
import { GetMealsDocument, GetMealsQuery, Meal, User } from '../generated/graphql-client';
import styles from './UserPage.module.css';
import { FoodList } from '../components/FoodList/FoodList';
import { getUserMeals } from '../components/helpers/GetMealsFunction';
import { UserInfoInterface } from '../state/reducers/UserData';
export interface IUserPageProps {}

export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    // console.log(dayIndex);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const dispatch = useDispatch();
    // const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);

    const { loading, error, data } = useQuery(GetMealsDocument, {
        variables: {
            userId,
            day1: dayIndex === 0,
            day2: dayIndex === 1,
            day3: dayIndex === 2,
            day4: dayIndex === 3,
            day5: dayIndex === 4,
            day6: dayIndex === 5,
            day7: dayIndex === 6
        }
    });

    //     try {
    //         // getMealAsync();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    useEffect(() => {
        if (loading) {
        } else {
            const user = data!.getMeals;
            // const user = data!.getMeals;

            if (user) {
                const { username, id } = user!;
                let day: any = [];
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
                let foodList: any;
                foodList = user.foodList;
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
                        accessToken: localStorage.getItem('accessToken')!,
                        foodList
                    })
                );
            }
        }
    });
    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
                <MealList></MealList>
                <FoodList></FoodList>
            </div>
        </div>
    );
}
