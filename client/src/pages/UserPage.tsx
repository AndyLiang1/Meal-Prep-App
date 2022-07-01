import { gql, useLazyQuery, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealList } from '../components/MealList/Meal/MealList';
import { Header } from '../components/Others/Header';
import { addUserToStore, changeDay } from '../state/action-creators';
import { IRootState } from '../state/reducers';
import { Food, GetFoodListDocument, GetMealListMealsDocument, Meal, User } from '../generated/graphql-client';
import styles from './UserPage.module.css';
import { FoodList } from '../components/FoodList/FoodList';
import { UserInfoInterface } from '../state/reducers/UserData';
export interface IUserPageProps {}

export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    // console.log(dayIndex);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const user = useSelector((state: IRootState) => state.user);
    const refetchTrigger = useSelector((state: IRootState) => state.refetchTrigger);
    const dispatch = useDispatch();

    const [day, setDay] = useState<any>([]);
    const [foodList, setFoodList] = useState<any>([]);
    // const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const [getMealListMeal] = useLazyQuery(GetMealListMealsDocument, {
        variables: {
            dayIndex
        }
    });
    const [getFoodList] = useLazyQuery(GetFoodListDocument)
    const getFoodInMeals = async () => {
        const { data } = await getMealListMeal();
        if (data?.getMealListMeal.ok) {
            setDay(data?.getMealListMeal.result);
        } else {
            console.error(data?.getMealListMeal.message);
        }
    };

    const getFoodInFoodList = async() => {
         const { data } = await getFoodList();
        if (data?.getFoodList.ok) {
            setFoodList(data?.getFoodList.result);
        } else {
            console.error(data?.getFoodList.message);
        } 
    }

    useEffect(() => {
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
    }, [day, foodList]);

    useEffect(() => {
        getFoodInMeals();
        getFoodInFoodList();
    }, [dayIndex, refetchTrigger]);


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
