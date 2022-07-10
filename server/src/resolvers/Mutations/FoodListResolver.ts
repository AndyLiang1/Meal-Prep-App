import { CreateFoodListInputReal, EditFoodListInputReal } from '../../generated/graphql-server';
import services from '../../services/services';
import { IUserDocument } from '../../models/User';

export const createFoodList = async (parent: any, { user, input }: { user: IUserDocument; input: CreateFoodListInputReal }, context: any, info: any) => {
    const createFoodListResponse = await services.foodListService.create(user, input);
    return createFoodListResponse;
};

export const getFoodList = async (parent: any, { user }: { user: IUserDocument }, context: any, info: any) => {
    const getFoodListResponse = await services.foodListService.get(user);
    return getFoodListResponse;
};

export const getFoodListFood = async (parent: any, { user, name }: { user: IUserDocument; name: string }, context: any, info: any) => {
    const getFoodListFoodResponse = await services.foodListService.getByName(user, name);
    return getFoodListFoodResponse;
};

export const editFoodList = async (parent: any, { user, input }: { user: IUserDocument; input: EditFoodListInputReal }, context: any, info: any) => {
    const editFoodListResponse = await services.foodListService.edit(user, input);
    return editFoodListResponse;
};

export const deleteFoodList = async (parent: any, { user, oldFoodNameToDelete }: { user: IUserDocument; oldFoodNameToDelete: string }, context: any, info: any) => {
    const deleteFoodListResponse = await services.foodListService.delete(user, oldFoodNameToDelete);
    return deleteFoodListResponse;
};
