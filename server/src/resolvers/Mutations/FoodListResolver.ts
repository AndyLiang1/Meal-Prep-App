import { CreateFoodListInput, EditFoodListInput, MutationCreateFoodArgs } from '../../generated/graphql-server';
import services from '../../services/services';
import { IUserDocument } from '../../models/User';

export const createFoodList = async (parent: any, { user, input }: { user: IUserDocument; input: CreateFoodListInput }, context: any, info: any) => {
    const { name, calories, proteins, carbs, fats, ingredientNames, ingredientActualAmounts, givenAmount } = input;

    const createFoodListResponse = await services.foodListService.create(user, name, calories, proteins, carbs, fats, ingredientNames, ingredientActualAmounts, givenAmount);
    return createFoodListResponse;
};

export const getFoodList = async (parent: any, { user }: { user: IUserDocument }, context: any, info: any) => {
    const getFoodListResponse = await services.foodListService.get(user);
    return getFoodListResponse;
};

export const editFoodList = async (parent: any, { user, input }: { user: IUserDocument; input: EditFoodListInput }, context: any, info: any) => {
    const { oldFoodName, newFoodName, newCalories, newProteins, newCarbs, newFats, newGivenAmount, newIngNames, newIngActualAmounts } = input;
    const editFoodListResponse = await services.foodListService.edit(user, oldFoodName, newFoodName, newCalories, newProteins, newCarbs, newFats, newIngNames, newIngActualAmounts, newGivenAmount);
    return editFoodListResponse;
};


export const deleteFoodList = async (parent: any, { user, oldFoodNameToDelete }: { user: IUserDocument; oldFoodNameToDelete: string }, context: any, info: any) => {
    console.log(oldFoodNameToDelete);
    const deleteFoodListResponse = await services.foodListService.delete(user, oldFoodNameToDelete);
    return deleteFoodListResponse;
};