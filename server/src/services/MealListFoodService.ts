import { MealListFoodDao } from '../daos/MealListFoodDao';
import { Food, Meal } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';

export class MealListFoodService {
    // private MealListFoodDao;
    constructor(private MealListFoodDao: MealListFoodDao) {}

    public async create(user: IUserDocument, food: Food, dayIndex: number, mealId: string) {
        const newlyCreatedFood = this.MealListFoodDao.create(user, food, dayIndex, mealId);
        console.log('Our newly created food is', newlyCreatedFood);
        return newlyCreatedFood;
    }

    public async edit(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number, newActualAmount: number) {
        return this.MealListFoodDao.edit(user, dayIndex, mealId, foodIndex, newActualAmount);
    }

    public async delete(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number) {
        return this.MealListFoodDao.delete(user, dayIndex, mealId, foodIndex);
    }
}
