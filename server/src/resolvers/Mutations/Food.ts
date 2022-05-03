import Logging from '../../library/Logging';
import UserModel, { IUserModel } from '../../models/User';

import { Food, Meal, MutationCreateFoodArgs, MutationDeleteFoodArgs, MutationEditFoodArgs, User } from '../../generated/graphql-server';

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
        const { userId, dayIndex, mealId, foodName, calories, proteins, carbs, fats, ingredientNames, givenAmount, actualAmount } = input;
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
            name: foodName,
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
};

const deleteFoodFromDay = (day: Meal[], mealId: string, foodName: string, once: boolean) => {
    for (let i = 0; i < day.length; i++) {
        if (day[i].id === mealId || !once) {
            const mealWeWant = day[i];
            for (let j = 0; j < mealWeWant.foods.length; j++) {
                if (mealWeWant.foods[j].name === foodName) {
                    mealWeWant.foods.splice(j, 1);
                    if (once) {
                        break;
                    }
                }
            }
            if (once) {
                break;
            }
        }
    }
};

export const deleteFood = async (parent: any, { input }: MutationDeleteFoodArgs, context: any, info: any) => {
    Logging.info('Deleting Food');
    // get my user
    try {
        const { userId, dayIndex, mealId, foodName } = input;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            Logging.error('No user found from deleteFood resolver');
        }
        if (mealId) {
            switch (dayIndex) {
                case 0:
                    deleteFoodFromDay(user!.day1, mealId, foodName, true);
                    break;
                case 1:
                    deleteFoodFromDay(user!.day2, mealId, foodName, true);
                    break;
                case 2:
                    deleteFoodFromDay(user!.day3, mealId, foodName, true);
                    break;
                case 3:
                    deleteFoodFromDay(user!.day4, mealId, foodName, true);
                    break;
                case 4:
                    deleteFoodFromDay(user!.day5, mealId, foodName, true);
                    break;
                case 5:
                    deleteFoodFromDay(user!.day6, mealId, foodName, true);
                    break;
                case 6:
                    deleteFoodFromDay(user!.day7, mealId, foodName, true);
                    break;
                default:
                    break;
            }
        } else {
            // we are deleting fromfoodList
            for (let i = 0; i < user!.foodList.length; i++) {
                if (foodName === user!.foodList[i].name) {
                    user!.foodList.splice(i, 1);
                    break;
                }
            }
            deleteFoodFromDay(user!.day1, mealId!, foodName, false);
            deleteFoodFromDay(user!.day2, mealId!, foodName, false);
            deleteFoodFromDay(user!.day3, mealId!, foodName, false);
            deleteFoodFromDay(user!.day4, mealId!, foodName, false);
            deleteFoodFromDay(user!.day5, mealId!, foodName, false);
            deleteFoodFromDay(user!.day6, mealId!, foodName, false);
            deleteFoodFromDay(user!.day7, mealId!, foodName, false);
        }

        await user!.save();
        return foodName;
    } catch (error) {
        Logging.error(error);
    }
};

const editFoodFromDay = (day: Meal[], mealId: string, foodIndex: number, newActualAmount: number ) => {
    for (let i = 0; i < day.length; i++) {
        if (day[i].id === mealId) {
            const mealWeWant = day[i];
            mealWeWant.foods[foodIndex].actualAmount = newActualAmount;
        }
    }
};

const completelyEditFoodFromMeals = (oldFoodName: string, newFood: Food, days: Meal[][]) => {
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        for (let i = 0; i < day.length; i++) {
            const meal = day[i];
            for (let i = 0; i < meal.foods.length; i++) {
                if (oldFoodName === meal.foods[i].name) {
                    const prevActualAmount = meal.foods[i].actualAmount;
                    meal.foods[i] = newFood;
                    meal.foods[i].actualAmount = prevActualAmount;
                }
            }
        }
    }
};

export const editFood = async (parent: any, { input }: MutationEditFoodArgs, context: any, info: any) => {
    Logging.info('Edit food');

    try {
        const { userId, dayIndex, mealId, foodName, newActualAmount, foodIndex } = input;
        const user = await UserModel.findOne({ _id: userId });
        // from mealList
        console.log(dayIndex, mealId, newActualAmount, foodName);
        if (mealId && newActualAmount) { // cannot check for dayIndex and foodIndex 
            console.log('hereee')                             // since they might = 0 and falsify the if statement
            switch (dayIndex) {
                case 0:
                    editFoodFromDay(user!.day1, mealId, foodIndex!, newActualAmount);
                    break;
                case 1:
                    editFoodFromDay(user!.day2, mealId, foodIndex!, newActualAmount);
                    break;
                case 2:
                    editFoodFromDay(user!.day3, mealId, foodIndex!, newActualAmount);
                    break;
                case 3:
                    editFoodFromDay(user!.day4, mealId, foodIndex!, newActualAmount);
                    break;
                case 4:
                    editFoodFromDay(user!.day5, mealId, foodIndex!, newActualAmount);
                    break;
                case 5:
                    editFoodFromDay(user!.day6, mealId, foodIndex!, newActualAmount);
                    break;
                case 6:
                    editFoodFromDay(user!.day7, mealId, foodIndex!, newActualAmount);
                    break;
                default:
                    break;
            }
            user!.save();
            return 'Successful';
        } else {
            // if we are here, it means we edited from foodList
            for (let i = 0; i < user!.foodList.length; i++) {
                const { newFoodName, newCalories, newProteins, newCarbs, newFats, newGivenAmount, newIngredientNames } = input;
                const newIngredients: Food[] = [];
                newIngredientNames!.forEach((name) => {
                    for (let i = 0; i < user!.foodList.length; i++) {
                        if (name === user!.foodList[i].name) {
                            newIngredients.push(user!.foodList[i]);
                            break;
                        }
                    }
                });

                if (foodName === user!.foodList[i].name) {
                    const newFood: Food = {
                        name: newFoodName!,
                        calories: newCalories!,
                        proteins: newProteins!,
                        carbs: newCarbs!,
                        fats: newFats!,
                        ingredients: newIngredients,
                        givenAmount: newGivenAmount!,
                        actualAmount: newGivenAmount!
                    };
                    user!.foodList[i] = newFood;
                    const userDays = [user!.day1, user!.day2, user!.day3, user!.day4, user!.day5, user!.day6, user!.day7];

                    completelyEditFoodFromMeals(foodName, newFood, userDays);
                }
                user!.save();
                return "Successful";
            }
        }
    } catch (error) {
        Logging.error(error);
    }
};
