import Logging from '../library/Logging';
import mongoose from 'mongoose';
import User from '../models/User';
import { Scalars } from '../generated/graphql-server';
import { getFoodList, getFoodListFood } from './Mutations/FoodListResolver';
import { getMealListMeal } from './Mutations/MealListMealResolver';
import { getMealListFood } from './Mutations/MealListFoodResolver';

const Query = {
    boop: (parent: any, args: any, context: any, info: any): any => {
        return 'Beep! Hello world! :D';
    },
    getFoodList,
    getFoodListFood,
    getMealListMeal, 
    getMealListFood,
    // =========================================================================
    // For testing
    // =========================================================================

    clearDb: async () => {
        await User.deleteMany();
        return null;
    }
};

export default Query;
