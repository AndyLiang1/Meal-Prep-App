import Logging from '../../library/Logging';
import UserModel from '../../models/User';

import { Food, Meal, MutationCreateFoodArgs, User } from '../../generated/graphql-server';

export const createFood = async (parent: any, { input }: MutationCreateFoodArgs, context: any, info: any) => {
    // =========================================================================
    // // ======================================================================
    // WIP
    // ======================================================================
    // =========================================================================
    try {
        const { userId, mealId, name, calories, proteins, carbs, fats, givenAmount, actualAmount } = input;
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
            ingredients,
            givenAmount,
            actualAmount
        };
        user!.foodList.push(food);
        user!.save();
        console.log(user);
        return food;
    } catch (error) {
        Logging.error(error);
    }
};

export const deleteFood = async (parent: any, args: any, context: any, info: any) => {
    Logging.info('Deleting Food');
    // get my user
    try {
        const { userId, dayIndex, mealId, foodName } = args;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from deleteFood resolver');
        }
        switch (dayIndex) {
            case 0:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day1[i].id === mealId) {
                        const mealWeWant = user!.day1[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                    }
                }
                break;
            case 1:
                for (let i = 0; i < user!.day1.length; i++) {
                    if (user!.day2[i].id === mealId) {
                        const mealWeWant = user!.day2[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                    }
                }
                break;
            case 2:
                for (let i = 0; i < user!.day1.length; i++) {
                    const mealWeWant = user!.day3[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                }
                break;
            case 3:
                for (let i = 0; i < user!.day1.length; i++) {
                    const mealWeWant = user!.day4[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                }
                break;
            case 4:
                for (let i = 0; i < user!.day1.length; i++) {
                    const mealWeWant = user!.day5[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                }
                break;
            case 5:
                for (let i = 0; i < user!.day1.length; i++) {
                    const mealWeWant = user!.day6[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
                }
                break;
            case 6:
                for (let i = 0; i < user!.day1.length; i++) {
                    const mealWeWant = user!.day7[i];
                        for (let j = 0; j < mealWeWant.foods.length; j++) {
                            if(mealWeWant.foods[j].name === foodName){
                                mealWeWant.foods.splice(j, 1);
                                break
                            }
                        }
                        break;
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
