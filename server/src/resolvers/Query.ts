import Logging from '../library/Logging';
import mongoose from 'mongoose';
import User from '../models/User';
import { Scalars } from '../generated/graphql-server';
import { getFoodList } from './Mutations/FoodListResolver';
import { getMealListMeal } from './Mutations/MealListMealResolver';

const Query = {
    boop: (parent: any, args: any, context: any, info: any): any => {
        return 'Beep! Hello world! :D';
    },
    getFoodList,
    getMealListMeal, 
    // =========================================================================
    // For testing
    // =========================================================================

    clearDb: async () => {
        await User.deleteMany();
        return null;
    }
};

export default Query;
