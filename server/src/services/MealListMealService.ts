import { MealListMealDao } from '../daos/MealListMealDao';
import { IUserDocument } from '../models/User';

export class MealListMealService {
    constructor(private MealListMealDao: MealListMealDao) {}

    public async create(user: IUserDocument, dayIndex: number) {
        const createdMeal = this.MealListMealDao.create(user, dayIndex);
        return createdMeal;
    }

    public async get(user: IUserDocument, dayIndex: number) {
        const meals = await this.MealListMealDao.get(user, dayIndex);
        return {
            ok: true,
            response: meals
        };
    }

    public async delete(user: IUserDocument, dayIndex: number, mealId: string) {
        const deletedMealId = this.MealListMealDao.delete(user, dayIndex, mealId);
        return deletedMealId;
    }
}
