import { Food } from '../generated/graphql-server';
import UserModel, { IUserDocument } from '../models/User';

export class FoodListDao {
    constructor() {}

    public async create(user: IUserDocument, food: Food) {
        user.foodList.push(food);
        await user.save();
        return food;
    }

    public async get(user: IUserDocument) {
        return user.foodList;
    }

    public async getByName(user: IUserDocument, name: string) {
        for (let food of user.foodList) {
            if (food.name === name) {
                return food;
            }
        }
    }

    public async edit(user: IUserDocument, oldFoodName: string, editedFood: Food) {
        for (let [i, food] of user.foodList.entries()) {
            if (oldFoodName === food.name) {
                user.foodList[i] = editedFood;
            } else {
                for (let [j, ing] of food.ingredients.entries()) {
                    if (oldFoodName === ing.name) {
                        console.log('========= Food we are editing: ', food.name + ' at index: ', i);
                        console.log('before change: ', user.foodList[3].calories);
                        user.foodList[i].calories -= (ing.actualAmount! / ing.givenAmount) * ing.calories;
                        user.foodList[i].proteins -= (ing.actualAmount! / ing.givenAmount) * ing.proteins;
                        user.foodList[i].carbs -= (ing.actualAmount! / ing.givenAmount) * ing.carbs;
                        user.foodList[i].fats -= (ing.actualAmount! / ing.givenAmount) * ing.fats;
                        user.foodList[i].ingredients[j] = {
                            name: editedFood.name,
                            calories: editedFood.calories,
                            proteins: editedFood.proteins,
                            carbs: editedFood.carbs,
                            fats: editedFood.fats,
                            ingredients: [],
                            givenAmount: editedFood.givenAmount,
                            actualAmount: ing.actualAmount
                        };
                        user.foodList[i].calories += (ing.actualAmount! / editedFood.givenAmount) * editedFood.calories;
                        user.foodList[i].proteins += (ing.actualAmount! / editedFood.givenAmount) * editedFood.proteins;
                        user.foodList[i].carbs += (ing.actualAmount! / editedFood.givenAmount) * editedFood.carbs;
                        user.foodList[i].fats += (ing.actualAmount! / editedFood.givenAmount) * editedFood.fats;
                        console.log('after change: ', user.foodList[3].calories);
                    }
                }
            }
        }

        console.log(user.foodList[3]);
        user.markModified('foodList');
        await user.save();
        return editedFood;
    }

    public async delete(user: IUserDocument, foodNameToDelete: string) {
        user.foodList = user.foodList.filter((food) => {
            return food.name !== foodNameToDelete;
        });
        await user.save();
        return foodNameToDelete;
    }
}
