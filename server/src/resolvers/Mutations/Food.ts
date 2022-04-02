import Logging from '../../library/Logging';
import UserModel from '../../models/User';

import { Day, Food, Meal, MutationCreateFoodArgs, User } from '../../generated/graphql-server';

export const createFood = async (parent: any, { input }: MutationCreateFoodArgs, context: any, info: any) => {
    try {
        const { userId, mealIndex, name, calories, proteins, carbs, fats } = input;
        let ingredientNames: string[] = input.ingredientNames;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createFood resolver');
        }

        const ingredients: Food[] = [];

        user!.foodList.forEach((foodFromUserFoodList: Food) => {
            if (ingredientNames.includes(foodFromUserFoodList.name)) {
                ingredientNames = ingredientNames.filter((namesOfFoodWeWant: string) => {
                    return namesOfFoodWeWant != foodFromUserFoodList.name;
                });
                ingredients.push(foodFromUserFoodList);
            }
        });

        const food: Food = {
            name,
            calories,
            proteins,
            carbs,
            fats,
            ingredients
        };
        user!.foodList.push(food);

        user!.days.forEach((day: Day) => {
            day.meals.forEach((meal: Meal) => {
                // Logging.info(meal.id)
                // Logging.info(mealId)
                // console.log(meal.id == mealId);
                if (meal.index == mealIndex) {
                    meal.foods.push(food);
                    console.log(user);
                }
            });
        });
        user!.username = 'bobb';

        user!.save();
        console.log(user);
        return food;
    } catch (error) {
        Logging.error(error);
    }
};
