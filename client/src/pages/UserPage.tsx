import { gql, useLazyQuery, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealList } from '../components/MealList/Meal/MealList';
import { Header } from '../components/Others/Header';
import { addUserToStore, changeDay } from '../state/action-creators';
import { IRootState } from '../state/reducers';
import { Food, GetMealListMealsDocument, Meal, User } from '../generated/graphql-client';
import styles from './UserPage.module.css';
import { FoodList } from '../components/FoodList/FoodList';
import { UserInfoInterface } from '../state/reducers/UserData';
export interface IUserPageProps {}

export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    // console.log(dayIndex);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const user = useSelector((state: IRootState) => state.user);
    const dispatch = useDispatch();

    const [day, setDay] = useState<any>([]);
    const [foodList, setFoodList] = useState<Food[]>([]);
    // const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const [getMealListMeal, { loading, error, data }] = useLazyQuery(GetMealListMealsDocument, {
        variables: {
            dayIndex
        }
    });
    const getMeals = async () => {
        const info = await getMealListMeal();
        console.log(info);
        setDay(info);
    };

    useEffect(() => {
        console.log(day.data);
        const { username } = user;

        dispatch(
            addUserToStore({
                username,
                day: day,
                loggedIn: true,
                accessToken: localStorage.getItem('accessToken')!,
                foodList
            })
        );
    }, [day]);

    useEffect(() => {
        getMeals();
    }, []);

    useEffect(() => {
        // dispatch(
        //     addUserToStore({
        //         username,
        //         day: mealListMeals,
        //         loggedIn: true,
        //         accessToken: localStorage.getItem('accessToken')!,
        //         foodList
        //     })
        // );
    }, []);

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
