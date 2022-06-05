import services from '../../services/services';
import { IUserDocument } from '../../models/User';
import { CreateMealListFoodInput } from '../../generated/graphql-server';

// export const createFoodList = async (parent: any, { user, input }: { user: IUserDocument; input: CreateFoodListInput }, context: any, info: any) => {
//     const { name, calories, proteins, carbs, fats, ingredientNames, ingredientActualAmounts, givenAmount } = input;

//     const createFoodListResponse = await services.foodListService.create(user, name, calories, proteins, carbs, fats, ingredientNames, ingredientActualAmounts, givenAmount);
//     return createFoodListResponse;
// };

export const createMealListFood = async (parent: any, { user, input }: { user: IUserDocument; input: CreateMealListFoodInput }, context: any, info: any) => {
    const { existingFoodName, name, calories, proteins, carbs, fats, ingredientNames, ingredientActualAmounts, givenAmount, actualAmount, dayIndex, mealId } = input;
    const newlyCreatedFoodResponse = await services.mealListFoodService.create(
        user,
        existingFoodName,
        name,
        calories,
        proteins,
        carbs,
        fats,
        ingredientNames,
        ingredientActualAmounts,
        givenAmount,
        actualAmount,
        dayIndex,
        mealId
    );
    return newlyCreatedFoodResponse;
};
