import services from '../../services/services';
import { IUserDocument } from '../../models/User';
import { CreateMealListFoodInput, CreateMealListFoodInput_Existing, CreateMealListFoodInput_NewYesIng, CreateMealListFoodInput_NewNoIng, CreateMealListFoodInputReal } from '../../generated/graphql-server';

export const createMealListFood = async (parent: any, { user, input }: { user: IUserDocument; input: CreateMealListFoodInputReal }, context: any, info: any) => {
    const newlyCreatedFoodResponse = await services.mealListFoodService.create(user, input);
    return newlyCreatedFoodResponse;
};
