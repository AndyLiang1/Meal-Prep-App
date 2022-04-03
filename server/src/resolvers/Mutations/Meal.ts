import { Food, Meal, MutationCreateFoodArgs, MutationCreateMealArgs, User } from '../../generated/graphql-server';
import Logging from '../../library/Logging';
import UserModel from '../../models/User';
import { createUID } from './Auth';

export const createMeal = async (parent: any, args: any, context: any, info: any) => {
    Logging.info('Creating Meals')
    // get my user
    try {
        const { userId, dayIndex } = args;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createMeal resolver');
        }
        let foods: Food[] = [];
        let newMeal: any = {
            index: 0,
            foods,
            id: createUID()
        };

        switch(dayIndex) {
            case 0: 
                user!.day1.push(newMeal)
                break
            case 1: 
                user!.day2.push(newMeal)
                break
            case 2: 
                user!.day3.push(newMeal)
                break
            case 3: 
                user!.day4.push(newMeal)
                break
            case 4: 
                user!.day5.push(newMeal)
                break
            case 5: 
                user!.day6.push(newMeal)
                break
            case 6: 
                user!.day7.push(newMeal)
                break
            default: 
                break
        }
        // user!.days.forEach((day) => {
        //     if (day.name === dayName) {
        //         newMeal.index = day.meals.length
        //         day.meals.push(newMeal);
        //     }
        // });

        await user!.save();
        return user;
    } catch (error) {
        Logging.error(error);
    }
};
