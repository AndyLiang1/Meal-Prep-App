import services from '../../services/services';
import { IUserDocument } from '../../models/User';
import { GetMealListMealResponse } from '../../generated/graphql-server';

export const getMealListMeal = async(parent: any, { user, dayIndex }: { user: IUserDocument; dayIndex: number }, context: any, info: any) => {
    const getMealListMealResponse = await services.mealListMealService.get(user, dayIndex);
    return getMealListMealResponse
}