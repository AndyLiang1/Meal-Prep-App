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

export type totalStats = {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
};

export function UserPage(props: IUserPageProps) {
    const userId: string = localStorage.getItem('id')!;
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const user = useSelector((state: IRootState) => state.user);
    const refetchTrigger = useSelector((state: IRootState) => state.refetchTrigger);
    const dispatch = useDispatch();

    const [day, setDay] = useState<any>([]);
    const [foodList, setFoodList] = useState<any>([]);
    const [totalStats, setTotalStats] = useState<totalStats | null>(null);
    // const { user }: { user: UserInfoInterface } = useSelector((state: IRootState) => state);
    const [mealStats, setMealStats] = useState<totalStats[]>([]);
    const [getMealListMeal] = useLazyQuery(GetMealListMealsDocument, {
        variables: {
            dayIndex
        }
    });

    const [getFoodList] = useLazyQuery(GetFoodListDocument);
    const getFoodInMeals = async () => {
        const { data } = await getMealListMeal();
        if (data?.getMealListMeal.ok) {
            setDay(data?.getMealListMeal.result);
        } else {
            console.error(data?.getMealListMeal.message);
        }
    };

    const getFoodInFoodList = async () => {
        const { data } = await getFoodList();
        if (data?.getFoodList.ok) {
            setFoodList(data?.getFoodList.result);
        } else {
            console.error(data?.getFoodList.message);
        }
    };
    useEffect(() => {
        let calories = 0;
        let proteins = 0;
        let carbs = 0;
        let fats = 0;
        let mealCalories = 0;
        let mealProteins = 0;
        let mealCarbs = 0;
        let mealFats = 0;
        const mealStatArr = [];
        for (let meal of user.day) {
            for (let food of meal.foods) {
                calories += food.calories * (food.actualAmount! / food.givenAmount);
                proteins += food.proteins * (food.actualAmount! / food.givenAmount);
                carbs += food.carbs * (food.actualAmount! / food.givenAmount);
                fats += food.fats * (food.actualAmount! / food.givenAmount);
                mealCalories += food.calories * (food.actualAmount! / food.givenAmount);
                mealProteins += food.proteins * (food.actualAmount! / food.givenAmount);
                mealCarbs += food.carbs * (food.actualAmount! / food.givenAmount);
                mealFats += food.fats * (food.actualAmount! / food.givenAmount);
            }
            mealStatArr.push({ calories: mealCalories, proteins: mealProteins, carbs: mealCarbs, fats: mealFats });
            mealCalories = 0;
            mealProteins = 0;
            mealCarbs = 0;
            mealFats = 0;
        }
        setMealStats(mealStatArr);
        setTotalStats({ calories, proteins, carbs, fats });
    }, [user]);

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
                <MealList totalStats={totalStats} mealStats={mealStats}></MealList>
                <FoodList></FoodList>
            </div>
        </div>
    );
}
