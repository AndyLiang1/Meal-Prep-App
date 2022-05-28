import { Food } from '../generated/graphql-server';
import UserModel, { IUserDocument } from '../models/User';

export class FoodListDao {
    constructor() {
    }

    public async create(user: IUserDocument, food: Food) {
        user.foodList.push(food);
        await user.save();
        return food;
    }

    public async get(user: IUserDocument) {
        return user.foodList;
    }

    public async edit(user: IUserDocument, oldFoodName: string, newFood: Food) {
        let editedFood: Food | null = null;
        for (let [i, food] of user.foodList.entries()) {
            if (oldFoodName === food.name) {
                user.foodList[i] = newFood;
                break;
            }
        }

        await user.save();
        return editedFood;
    }

    public async delete(user: IUserDocument, foodNameToDelete: string) {
        user.foodList = user.foodList.filter((food) => {
            return food.name !== foodNameToDelete;
        });
        await user.save();
    }
}
