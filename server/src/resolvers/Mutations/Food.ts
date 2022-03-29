import Logging from '../../library/Logging';
import User from '../../models/User';

import DayInterface from '../../../../client/src/state/helpers/IDay';
import MealInterface from '../../../../client/src/state/helpers/IMeal';
import FoodInterface from '../../../../client/src/state/helpers/IFood';

export const createFood = async (parent: any, { input }: any, context: any, info: any) => {
    try {
        const { userId, mealId, name, calories, proteins, carbs, fats } = input;
        let ingredientNames: string[] = input.ingredientNames;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createFood resolver');
        }

        const ingredients: FoodInterface[] = [];

        user!.foodList.forEach((foodFromUserFoodList) => {
            if (ingredientNames.includes(foodFromUserFoodList.name)) {
                ingredientNames = ingredientNames.filter((namesOfFoodWeWant: string) => {
                    return namesOfFoodWeWant != foodFromUserFoodList.name;
                });
                ingredients.push(foodFromUserFoodList);
            }
        });

        const food: FoodInterface = {
            name,
            calories,
            proteins,
            carbs,
            fats,
            ingredients
        };
        user!.foodList.push(food);

        user!.days.forEach((day: DayInterface) => {
            day.meals.forEach((meal: MealInterface) => {
                // Logging.info(meal.id)
                // Logging.info(mealId)
                // console.log(meal.id == mealId);
                if (meal.id == mealId) {
                    meal.foods.push(food);
                    console.log(user)
                }
            });
        });
        user!.username = 'bobb';

        user!.save()
        console.log(user)
        return food;
    } catch (error) {
        Logging.error(error);
    }
};
