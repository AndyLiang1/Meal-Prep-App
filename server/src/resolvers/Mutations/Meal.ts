import { Day, Food, Meal, MutationCreateFoodArgs, MutationCreateMealArgs, User } from '../../generated/graphql-server';
import Logging from '../../library/Logging';
import UserModel from '../../models/User';

export const createMeal = async (parent: any, args: MutationCreateMealArgs, context: any, info: any) => {
    // get my user
    try {
        const { userId, dayName } = args;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createMeal resolver');
        }
        let foods: Food[] = [];
        let newMeal: Meal = {
            index: 0,
            foods
        };
        user!.days.forEach((day) => {
            if (day.name === dayName) {
                newMeal.index = day.meals.length
                day.meals.push(newMeal);
            }
        });

        await user!.save();
        return user;
    } catch (error) {
        Logging.error(error);
    }
};
