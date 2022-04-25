import Logging from '../../library/Logging';
import UserModel, { IUserModel } from '../../models/User';

import { Food, Meal, MutationCreateFoodArgs, User } from '../../generated/graphql-server';

const addFoodToMealAndFoodList = (
    user: IUserModel & {
        _id: any;
    },
    day: Meal[],
    mealId: string,
    newFood: Food
) => {
    day.forEach((meal) => {
        if (meal.id === mealId) {
            meal.foods.push(newFood);
        }
    });

    let foodHasUniqueName = true;
    user.foodList.forEach((food) => {
        if (newFood.name === food.name) {
            foodHasUniqueName = false;
        }
    });
    if (foodHasUniqueName) user!.foodList.push(newFood);
    user.save();
    return newFood;
};

export const createFood = async (parent: any, { input }: MutationCreateFoodArgs, context: any, info: any) => {
    // find out where we are coming from
    try {
        const { userId, dayIndex, mealId, name, calories, proteins, carbs, fats, ingredientNames, givenAmount, actualAmount } = input;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from createFood resolver');
        }

        // assume the ingredientNames exist
        // get the ingredients
        const ingredients: Food[] = [];
        ingredientNames?.forEach((ingredientName) => {
            for (let i = 0; i < user!.foodList.length; i++) {
                if (ingredientName === user!.foodList[i].name) {
                    ingredients.push(user!.foodList[i]);
                    break;
                }
            }
        });

        const newFood: Food = {
            name,
            calories,
            proteins,
            carbs,
            fats,
            ingredients,
            givenAmount,
            actualAmount
        };
        // if mealId, then we must be adding from a meal and not the foodList
        if (mealId) {
            let day: Meal[] = [];
            switch (dayIndex) {
                case 0:
                    day = user!.day1;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 1:
                    day = user!.day2;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 2:
                    day = user!.day3;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 3:
                    day = user!.day4;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 4:
                    day = user!.day5;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 5:
                    day = user!.day6;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                case 6:
                    day = user!.day7;
                    return addFoodToMealAndFoodList(user!, day, mealId, newFood);
                    break;
                default:
                    return newFood;
            }
        } else {
            // so we don't have mealId, that means we are creating generic food
            user!.foodList.push(newFood);
            user!.save();
            return newFood;
        }
    } catch (error) {
        Logging.error(error);
    }

    // try {
    //     const { userId, mealId, name, calories, proteins, carbs, fats, givenAmount, actualAmount } = input;
    //     let ingredientNames: string[] = input.ingredientNames;
    //     const user = await UserModel.findOne({ _id: userId });
    //     if (!user) {
    //         Logging.error('No user found from createFood resolver');
    //     }

    //     const ingredients: Food[] = [];

    //     user!.foodList.forEach((foodFromUserFoodList: Food) => {
    //         if (ingredientNames.includes(foodFromUserFoodList.name)) {
    //             ingredientNames = ingredientNames.filter((namesOfFoodWeWant: string) => {
    //                 return namesOfFoodWeWant != foodFromUserFoodList.name;
    //             });
    //             ingredients.push(foodFromUserFoodList);
    //         }
    //     });

    //     const food: Food = {
    //         name,
    //         calories,
    //         proteins,
    //         carbs,
    //         fats,
    //         ingredients,
    //         givenAmount,
    //         actualAmount
    //     };
    //     user!.foodList.push(food);
    //     user!.save();
    //     console.log(user);
    //     return food;
    // } catch (error) {
    //     Logging.error(error);
    // }
};

const deleteFoodFromDay = (day: Meal[], mealId: string, foodName: string) => {
    for (let i = 0; i < day.length; i++) {
        if (day[i].id === mealId) {
            const mealWeWant = day[i];
            for (let j = 0; j < mealWeWant.foods.length; j++) {
                if (mealWeWant.foods[j].name === foodName) {
                    mealWeWant.foods.splice(j, 1);
                    break;
                }
            }
            break;
        }
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
                deleteFoodFromDay(user!.day1, mealId, foodName);
                break;

            case 1:
                deleteFoodFromDay(user!.day2, mealId, foodName);
                break;
            case 2:
                deleteFoodFromDay(user!.day3, mealId, foodName);
                break;
            case 3:
                deleteFoodFromDay(user!.day4, mealId, foodName);
                break;
            case 4:
                deleteFoodFromDay(user!.day5, mealId, foodName);
                break;
            case 5:
                deleteFoodFromDay(user!.day6, mealId, foodName);
                break;
            case 6:
                deleteFoodFromDay(user!.day7, mealId, foodName);
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
