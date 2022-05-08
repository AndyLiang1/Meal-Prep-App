import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Meal } from '../../generated/graphql-client';
import { IRootState } from '../../state/reducers';
import styles from './StatTotal.module.css';
export interface ITotalStatProps {}

export function TotalStat(props: ITotalStatProps) {
    const user = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProteins, setTotalProteins] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFats, setTotalFats] = useState(0);

    const calculateStatInDay = (day: Meal[]) => {
        let totalCals = 0;
        let totalP = 0;
        let totalC = 0;
        let totalF = 0;

        for (let i = 0; i < day.length; i++) {
            const meal = day[i];
            for (let j = 0; i < meal.foods.length; i++) {
                const food = meal.foods[j];
                totalCals += food.calories;
                totalP += food.proteins;
                totalC += food.carbs;
                totalF += food.fats;
            }
        }
        setTotalCalories(totalCals);
        setTotalProteins(totalP);
        setTotalCarbs(totalC);
        setTotalFats(totalF);
    };

    const calculateStat = () => {
        switch (dayIndex) {
            case 0:
                calculateStatInDay(user.day1);
                break;
            case 1:
                calculateStatInDay(user.day2);
                break;
            case 2:
                calculateStatInDay(user.day3);
                break;
            case 3:
                calculateStatInDay(user.day4);
                break;
            case 4:
                calculateStatInDay(user.day5);
                break;
            case 5:
                calculateStatInDay(user.day6);
                break;
            case 6:
                calculateStatInDay(user.day7);
                break;
            default:
                calculateStatInDay(user.day1);
                break;
        }
    };
    useEffect(() => {
        calculateStat();
    }, [user]);
    return (
        <div>
            <div className={styles.title_container}>Today's stats:</div>
            <div className={styles.stat_container}>
                <div className={styles.stat}>Calories: {totalCalories}</div>
                <div className={styles.stat}>Proteins: {totalProteins}</div>
                <div className={styles.stat}>Carbs: {totalCarbs}</div>
                <div className={styles.stat}>Fats: {totalFats}</div>
            </div>
        </div>
    );
}
