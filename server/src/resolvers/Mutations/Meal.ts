import { Food, Meal, MutationCreateFoodArgs, MutationCreateMealArgs, User } from '../../generated/graphql-server';
import Logging from '../../library/Logging';
import UserModel from '../../models/User';
import { createUID } from './Auth';

export const createMeal = async (parent: any, args: any, context: any, info: any) => {
    Logging.info('Creating Meals');
    // get my user
    try {
        const { userId, dayIndex } = args;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createMeal resolver');
        }
        let foods: Food[] = [];
        let newMeal: Meal = {
            name: 'Meal',
            index: 0,
            foods,
            id: createUID()
        };

        switch (dayIndex) {
            case 0:
                user!.day1.push(newMeal);
                break;
            case 1:
                user!.day2.push(newMeal);
                break;
            case 2:
                user!.day3.push(newMeal);
                break;
            case 3:
                user!.day4.push(newMeal);
                break;
            case 4:
                user!.day5.push(newMeal);
                break;
            case 5:
                user!.day6.push(newMeal);
                break;
            case 6:
                user!.day7.push(newMeal);
                break;
            default:
                break;
        }
        // user!.days.forEach((day) => {
        //     if (day.name === dayName) {
        //         newMeal.index = day.meals.length
        //         day.meals.push(newMeal);
        //     }
        // });

        await user!.save();
        return newMeal.id;
    } catch (error) {
        Logging.error(error);
    }
};

export const deleteMeal = async (parent: any, args: any, context: any, info: any) => {
    Logging.info('Deleting Meals');
    // get my user
    try {
        const { userId, dayIndex, mealId } = args;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from deleteMeal resolver');
        }
        switch (dayIndex) {
            case 0:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day1[i].id === mealId) {
                        user!.day1.splice(i, 1);
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day2[i].id === mealId) {
                        user!.day2.splice(i, 1);
                        break;
                    }
                }
                break;
            case 2:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day3[i].id === mealId) {
                        user!.day3.splice(i, 1);
                        break;
                    }
                }
                break;
            case 3:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day4[i].id === mealId) {
                        user!.day4.splice(i, 1);
                        break;
                    }
                }
                break;
            case 4:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day5[i].id === mealId) {
                        user!.day5.splice(i, 1);
                        break;
                    }
                }
                break;
            case 5:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day6[i].id === mealId) {
                        user!.day6.splice(i, 1);
                        break;
                    }
                }
                break;
            case 6:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day1[i].id === mealId) {
                        user!.day1.splice(i, 1);
                        break;
                    }
                }
                break;
            default:
                break;
        }
        // user!.days.forEach((day) => {
        //     if (day.name === dayName) {
        //         newMeal.index = day.meals.length
        //         day.meals.push(newMeal);
        //     }
        // });

        await user!.save();
        return mealId;
    } catch (error) {
        Logging.error(error);
    }
};
