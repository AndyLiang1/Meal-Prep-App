import services from '../../services/services';
import { IUserDocument } from '../../models/User';
import { CreateMealListFoodInput, CreateMealListFoodInput_Existing, CreateMealListFoodInput_NewYesIng, CreateMealListFoodInput_NewNoIng, CreateMealListFoodInputReal, EditMealListFoodInputReal } from '../../generated/graphql-server';

export const createMealListFood = async (parent: any, { user, input }: { user: IUserDocument; input: CreateMealListFoodInputReal }, context: any, info: any) => {
    const newlyCreatedFoodResponse = await services.mealListFoodService.create(user, input);
    return newlyCreatedFoodResponse;
};

export const editMealListFood = async (parent: any, { user, input }: { user: IUserDocument; input: EditMealListFoodInputReal }, context: any, info: any) => {
    const newlyEditedFoodResponse = await services.mealListFoodService.edit(user, input);
    return newlyEditedFoodResponse;
};

export const deleteMealListFood = async(parent: any, { user, input }: { user: IUserDocument; input: any }, context: any, info: any) => {
    const deletedResponse = await services.mealListFoodService.delete(user, input)
    return deletedResponse;
}