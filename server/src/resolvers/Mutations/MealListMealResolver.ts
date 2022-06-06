import services from '../../services/services';
import { IUserDocument } from '../../models/User';

export const getMealListMeal = async(parent: any, { user, dayIndex }: { user: IUserDocument; dayIndex: number }, context: any, info: any) => {
    const getMealListMealResponse = await services.mealListMealService.get(user, dayIndex)
    return getMealListMealResponse
}