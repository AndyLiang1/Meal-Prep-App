import { Food, Meal } from '../generated/graphql-server';
import { IUser, IUserDocument } from '../models/User';

export class MealListFoodDao {
    constructor() {}

    /** Assumes that the food has been validated  */
    private async createFoodHelper(food: Food, day: Meal[], mealId: string) {
        for (let meal of day) {
            if (mealId === meal.id) {
                meal.foods.push(food);
                break;
            }
        }
    }

    public async create(user: IUserDocument, food: Food, dayIndex: number, mealId: string) {
        switch (dayIndex) {
            case 0:
                this.createFoodHelper(food, user.day1, mealId)!;
                break;
            case 1:
                this.createFoodHelper(food, user.day2, mealId)!;
                break;
            case 2:
                this.createFoodHelper(food, user.day3, mealId)!;
                break;
            case 3:
                this.createFoodHelper(food, user.day4, mealId)!;
                break;
            case 4:
                this.createFoodHelper(food, user.day5, mealId)!;
                break;
            case 5:
                this.createFoodHelper(food, user.day6, mealId)!;
                break;
            case 6:
                this.createFoodHelper(food, user.day7, mealId)!;
                break;
            default:
                this.createFoodHelper(food, user.day1, mealId)!;
                break;
        }
        await user.save();
        return food;
    }

    private async getFoodHelper(day: Meal[], mealId: string, foodIndex: number) {
        for (let meal of day) {
            if (mealId === meal.id) {
                const retFood: any = meal.foods[foodIndex];
                return retFood;
            }
            break;
        }
    }

    public async get(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number) {
        switch (dayIndex) {
            case 0:
                return this.getFoodHelper(user.day1, mealId, foodIndex);
            case 1:
                return this.getFoodHelper(user.day2, mealId, foodIndex);
            case 2:
                return this.getFoodHelper(user.day3, mealId, foodIndex);
            case 3:
                return this.getFoodHelper(user.day4, mealId, foodIndex);
            case 4:
                return this.getFoodHelper(user.day5, mealId, foodIndex);
            case 5:
                return this.getFoodHelper(user.day6, mealId, foodIndex);
            case 6:
                return this.getFoodHelper(user.day7, mealId, foodIndex);
            default:
                break;
        }
    }

    private async editFoodHelper(day: Meal[], mealId: string, foodIndex: number, newFood: Food) {
        for (let meal of day) {
            if (mealId === meal.id) {
                meal.foods[foodIndex] = {
                    ...newFood
                };
            }
            break;
        }
    }

    public async edit(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number, newFood: Food) {
        switch (dayIndex) {
            case 0:
                this.editFoodHelper(user.day1, mealId, foodIndex, newFood);
                break;
            case 1:
                this.editFoodHelper(user.day2, mealId, foodIndex, newFood);
                break;
            case 2:
                this.editFoodHelper(user.day3, mealId, foodIndex, newFood);
                break;
            case 3:
                this.editFoodHelper(user.day4, mealId, foodIndex, newFood);
                break;
            case 4:
                this.editFoodHelper(user.day5, mealId, foodIndex, newFood);
                break;
            case 5:
                this.editFoodHelper(user.day6, mealId, foodIndex, newFood);
                break;
            case 6:
                this.editFoodHelper(user.day7, mealId, foodIndex, newFood);
                break;
            default:
                break;
        }
        await user.save();
        return newFood;
    }
    private async deleteFoodHelper(day: Meal[], mealId: string, foodIndex: number) {
        for (let meal of day) {
            if (mealId === meal.id) {
                meal.foods.splice(foodIndex, 1);
            }
            break;
        }
    }
    public async delete(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number) {
        switch (dayIndex) {
            case 0:
                this.deleteFoodHelper(user.day1, mealId, foodIndex);
                break;
            case 1:
                this.deleteFoodHelper(user.day2, mealId, foodIndex);
                break;
            case 2:
                this.deleteFoodHelper(user.day3, mealId, foodIndex);
                break;
            case 3:
                this.deleteFoodHelper(user.day4, mealId, foodIndex);
                break;
            case 4:
                this.deleteFoodHelper(user.day5, mealId, foodIndex);
                break;
            case 5:
                this.deleteFoodHelper(user.day6, mealId, foodIndex);
                break;
            case 6:
                this.deleteFoodHelper(user.day7, mealId, foodIndex);
                break;
            default:
                break;
        }
        await user.save();
    }
    private editMoreFoodInDay(day: Meal[], oldFoodName: string, editedFood: Food) {
        if (editedFood.ingredients.length) {
            day.forEach((meal) => {
                meal.foods.forEach((food: Food) => {
                    if (oldFoodName === food.name) {
                        food.name = editedFood.name;
                        food.calories = editedFood.calories;
                        food.proteins = editedFood.proteins;
                        food.carbs = editedFood.carbs;
                        food.fats = editedFood.fats;
                        food.ingredients = editedFood.ingredients;
                        food.givenAmount = editedFood.givenAmount;
                        return; // equiv to continue
                    }
                });
            });
        } else {
            day.forEach((meal) => {
                meal.foods.forEach((food: Food) => {
                    if (oldFoodName === food.name) {
                        food.name = editedFood.name;
                        food.calories = editedFood.calories;
                        food.proteins = editedFood.proteins;
                        food.carbs = editedFood.carbs;
                        food.fats = editedFood.fats;
                        food.ingredients = editedFood.ingredients;
                        food.givenAmount = editedFood.givenAmount;
                        return; // equiv to continue
                    }
                    // food.ingredients.forEach((ing) => {
                    for (let [i, ing] of food.ingredients.entries()) {
                        if (oldFoodName === ing.name) {
                            food.calories -= (ing.actualAmount! / ing.givenAmount) * ing.calories;
                            food.proteins -= (ing.actualAmount! / ing.givenAmount) * ing.proteins;
                            food.carbs -= (ing.actualAmount! / ing.givenAmount) * ing.carbs;
                            food.fats -= (ing.actualAmount! / ing.givenAmount) * ing.fats;
                            // hmm not sure why this won't work, referencing issue likely 
                            // ing.name = editedFood.name;
                            // ing.calories = editedFood.calories;
                            // ing.proteins = editedFood.proteins;
                            // ing.carbs = editedFood.carbs;
                            // ing.fats = editedFood.fats;
                            // ing.givenAmount = editedFood.givenAmount;
                            food.ingredients[i] = {
                                name: editedFood.name,
                                calories: editedFood.calories,
                                proteins: editedFood.proteins,
                                carbs: editedFood.carbs,
                                fats: editedFood.fats,
                                ingredients: [],
                                givenAmount: editedFood.givenAmount,
                                actualAmount: ing.actualAmount
                            };
                            food.calories += (ing.actualAmount! / editedFood.givenAmount) * editedFood.calories;
                            food.proteins += (ing.actualAmount! / editedFood.givenAmount) * editedFood.proteins;
                            food.carbs += (ing.actualAmount! / editedFood.givenAmount) * editedFood.carbs;
                            food.fats += (ing.actualAmount! / editedFood.givenAmount) * editedFood.fats;
                        }
                    }
                });
            });
        }
    }

    public async editMoreFood(user: IUserDocument, oldFoodName: string, editedFood: Food) {
        this.editMoreFoodInDay(user.day1, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day2, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day3, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day4, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day5, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day6, oldFoodName, editedFood);
        this.editMoreFoodInDay(user.day7, oldFoodName, editedFood);
        await user.save();
    }

    private deleteMoreFoodInDay(day: Meal[], foodNameToDelete: string) {
        for (let meal of day) {
            meal.foods = meal.foods.filter((food) => {
                return foodNameToDelete !== food.name;
            });
            meal.foods.forEach((food) => {
                food.ingredients = food.ingredients.filter((ing) => {
                    return ing.name !== foodNameToDelete;
                });
            });
        }
    }

    public async deleteMoreFood(user: IUserDocument, foodNameToDelete: string) {
        this.deleteMoreFoodInDay(user.day1, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day2, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day3, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day4, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day5, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day6, foodNameToDelete);
        this.deleteMoreFoodInDay(user.day7, foodNameToDelete);
        await user.save();
    }
}
