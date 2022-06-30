import services from '../../services/services';
import { IUserDocument } from '../../models/User';
import { GetMealListMealResponse } from '../../generated/graphql-server';

export const createMealListMeal = async (parent: any, { user, dayIndex }: { user: IUserDocument; dayIndex: number }, context: any, info: any) => {
    const createMealListMealId = await services.mealListMealService.create(user, dayIndex);
    return createMealListMealId;
};

export const getMealListMeal = async (parent: any, { user, dayIndex }: { user: IUserDocument; dayIndex: number }, context: any, info: any) => {
    const getMealListMealResponse = await services.mealListMealService.get(user, dayIndex);
    return getMealListMealResponse;
};

export const deleteMealListMeal = async (parent: any, { user, dayIndex, mealId }: { user: IUserDocument; dayIndex: number; mealId: string }, context: any, info: any) => {
    const deleteMealListMealId = await services.mealListMealService.delete(user, dayIndex, mealId);
    return deleteMealListMealId;
};

