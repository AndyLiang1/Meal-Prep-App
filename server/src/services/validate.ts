import Joi from 'joi';
import {
    CreateMealListFoodInput_Existing,
    CreateMealListFoodInput_NewYesIng,
    CreateMealListFoodInput_NewNoIng,
    Meal,
    EditMealListFoodInput_ActualAmount,
    EditMealListFoodInput_NewNoIng,
    EditMealListFoodInput_NewYesIng,
    DeleteMealListFoodInputReal,
    CreateFoodListInput_NewNoIng,
    CreateFoodListInput_NewYesIng,
    EditFoodListInput_NewNoIng,
    EditFoodListInput_NewYesIng
} from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { foodStatsWillBeBasedOnIngredients } from './helpers';

const errorMessage = {
    statsCheck: {
        calories: 'Please ensure the calories field is greater than 0. ',
        proteins: 'Please ensure the proteins field is greater than 0. ',
        carbs: 'Please ensure the carbs field is greater than 0. ',
        fats: 'Please ensure fats field is greater than 0. ',
        givenAmount: 'Please ensure givenAmount field is greater than 0. '
    },

    existingvalNameNotEmpty: {
        invalidExistingName: 'This food name is invalid. '
    },
    uniqueFoodNameAndIngCheck: {
        uniqueFoodName: 'There is already a food with the same name in your foodList. ',
        ingOfItself: 'A food cannot be an ingredient of itself. ',
        ingHasIng: 'An ingredient cannot have its own ingredients. '
    },

    actualAmountsValid: {
        invalidActualAmount: 'Actual amounts should always be greater than 0. '
    },

    givenAmountValid: {
        invalidGivenAmount: 'Given amounts should always be greater than 0. '
    },

    actualAmountAndDayIndexValid: {
        invalidActualAmount: 'Actual amounts should always be greater than 0. ',
        invalidDayIndex: 'Day indices should always between 0 and 6 inclusive. '
    }
};

const register = (username: string, email: string, password: string) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().required()
    });
    const { error } = schema.validate({ username: username, email: email, password: password });
    return error;
};
const login = (email: string, password: string) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().required()
    });
    const { error } = schema.validate({ email: email, password: password });
    return error;
};

const valStats = (calories: number, proteins: number, carbs: number, fats: number) => {
    if (calories <= 0) {
        return errorMessage.statsCheck.calories;
    }
    if (proteins <= 0) {
        return errorMessage.statsCheck.proteins;
    }
    if (carbs <= 0) {
        return errorMessage.statsCheck.carbs;
    }
    if (fats <= 0) {
        return errorMessage.statsCheck.fats;
    }
    return true;
};

const valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng = (user: IUserDocument, ingNames: string[], thisFoodName: string, foodCanAlreadyExistInFoodListSinceWeAreEditing = false) => {
    for (let foodName of ingNames) {
        // no infinite cycle of food being its own ing
        if (thisFoodName === foodName) {
            return errorMessage.uniqueFoodNameAndIngCheck.ingOfItself;
        }
    }
    for (let foodInFoodList of user.foodList) {
        // cannot create a food if it exists in foodList
        if (foodInFoodList.name === thisFoodName && !foodCanAlreadyExistInFoodListSinceWeAreEditing) {
            return errorMessage.uniqueFoodNameAndIngCheck.uniqueFoodName;
        }
        // checks every food in food list against all ingredients of current food
        for (let ingName of ingNames) {
            if (foodInFoodList.name === ingName) {
                // an ing cannot have ing
                if (foodInFoodList.ingredients.length) {
                    return errorMessage.uniqueFoodNameAndIngCheck.ingHasIng;
                }
            }
        }
    }
    return true;
};

const valFoodNotUsedAsIngAlready = (user: IUserDocument, name: string) => {
    for (let food of user.foodList) {
        for (let ing of food.ingredients) {
            if (name === ing.name) {
                return 'Sorry, this food is already being used as an ingredient for ' + food.name + '. ';
            }
        }
    }
};

const valIngActualAmounts = (ingActualAmounts: number[]) => {
    for (let actualAmount of ingActualAmounts) {
        if (actualAmount <= 0) {
            return errorMessage.actualAmountsValid.invalidActualAmount;
        }
    }
};

const valGivenAmount = (givenAmount: number) => {
    if (givenAmount <= 0) {
        return errorMessage.givenAmountValid.invalidGivenAmount;
    }
};

const createFoodList = (
    user: IUserDocument,
    name: string,
    calories: number | null | undefined,
    proteins: number | null | undefined,
    carbs: number | null | undefined,
    fats: number | null | undefined,
    newIngNames: string[],
    newIngActualAmounts: number[],
    givenAmount: number
) => {
    let statsOk: string | boolean = true;
    if (foodStatsWillBeBasedOnIngredients(calories, proteins, carbs, fats, newIngNames)) {
        statsOk = valStats(calories!, proteins!, carbs!, fats!);
    }
    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, newIngNames, name);
    let newIngActualAmountOk = valIngActualAmounts(newIngActualAmounts);
    let givenAmountOk = valGivenAmount(givenAmount);

    if (typeof statsOk === 'string') {
        return {
            ok: false,
            message: statsOk
        };
    } else if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof newIngActualAmountOk === 'string') {
        return {
            ok: false,
            message: newIngActualAmountOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    }

    return {
        ok: true
    };
};

const actualAmountAndDayIndexValid = (actualAmount: number, dayIndex: number) => {
    if (actualAmount <= 0) {
        return errorMessage.actualAmountAndDayIndexValid.invalidActualAmount;
    }
    if (dayIndex < 0 || dayIndex > 6) {
        return errorMessage.actualAmountAndDayIndexValid.invalidDayIndex;
    }
};

const valNameNotEmpty = (name: string) => {
    if (name === '') {
        return errorMessage.existingvalNameNotEmpty.invalidExistingName;
    }
};

const createFoodList_NewNoIng = (user: IUserDocument, input: CreateFoodListInput_NewNoIng) => {
    const { name, calories, proteins, carbs, fats, givenAmount } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);
    let statsOk = valStats(calories, proteins, carbs, fats);
    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, [], name!);
    let givenAmountOk = valGivenAmount(givenAmount!);
    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (typeof statsOk === 'string') {
        return {
            ok: false,
            message: statsOk
        };
    } else if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    }

    return {
        ok: true
    };
};
const createFoodList_NewYesIng = (user: IUserDocument, input: CreateFoodListInput_NewYesIng) => {
    const { name, ingredientNames, ingredientActualAmounts, givenAmount } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);
    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (ingredientNames.length !== ingredientActualAmounts.length) {
        return {
            ok: false,
            message: 'Ingredient names array and ingredient actual amounts array has a different number of elements. '
        };
    }

    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, ingredientNames, name!);
    let ingActualAmountsOk = valIngActualAmounts(ingredientActualAmounts);
    let givenAmountOk = valGivenAmount(givenAmount);

    if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof ingActualAmountsOk === 'string') {
        return {
            ok: false,
            message: ingActualAmountsOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    }
    return {
        ok: true
    };
};

const editFoodList_NewNoIng = (user: IUserDocument, input: EditFoodListInput_NewNoIng) => {
    const { oldFoodName, name, calories, proteins, carbs, fats, givenAmount } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);
    let statsOk = valStats(calories, proteins, carbs, fats);
    let givenAmountOk = valGivenAmount(givenAmount!);

    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (typeof statsOk === 'string') {
        return {
            ok: false,
            message: statsOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    }
    return {
        ok: true
    };
};
const editFoodList_NewYesIng = (user: IUserDocument, input: EditFoodListInput_NewYesIng) => {
    const { oldFoodName, name, ingredientNames, ingredientActualAmounts, givenAmount } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);

    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (ingredientNames.length !== ingredientActualAmounts.length) {
        return {
            ok: false,
            message: 'Ingredient names array and ingredient actual amounts array has a different number of elements. '
        };
    }

    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, ingredientNames, name!, true);
    let ingActualAmountsOk = valIngActualAmounts(ingredientActualAmounts);
    let givenAmountOk = valGivenAmount(givenAmount!);
    let foodNotAlreadyUsedAsIngOk = valFoodNotUsedAsIngAlready(user, oldFoodName);
    if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    } else if (typeof ingActualAmountsOk === 'string') {
        return {
            ok: false,
            message: ingActualAmountsOk
        };
    } else if (typeof foodNotAlreadyUsedAsIngOk === 'string') {
        return {
            ok: false,
            message: foodNotAlreadyUsedAsIngOk
        };
    }
    return {
        ok: true
    };
};

const createMealListFood_Existing = (input: CreateMealListFoodInput_Existing) => {
    let nameNotEmptyOk = valNameNotEmpty(input.existingFoodName);
    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    }
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(input.actualAmount, input.dayIndex);
    if (actualAmountAndDayIndexOk !== '') {
        return {
            ok: false,
            message: actualAmountAndDayIndexOk
        };
    }
    return { ok: true };
};

const createOrEditMealListFood_NewNoIng = (user: IUserDocument, input: CreateMealListFoodInput_NewNoIng | EditMealListFoodInput_NewNoIng) => {
    const { name, calories, proteins, carbs, fats, givenAmount, actualAmount, dayIndex } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);
    let statsOk = valStats(calories, proteins, carbs, fats);
    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, [], name!);
    let givenAmountOk = valGivenAmount(givenAmount!);
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(actualAmount, dayIndex);
    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (typeof statsOk === 'string') {
        return {
            ok: false,
            message: statsOk
        };
    } else if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    } else if (typeof actualAmountAndDayIndexOk === 'string') {
        return {
            ok: false,
            message: actualAmountAndDayIndexOk
        };
    }

    return {
        ok: true
    };
};

const createOrEditMealListFood_NewYesIng = (user: IUserDocument, input: CreateMealListFoodInput_NewYesIng | EditMealListFoodInput_NewYesIng) => {
    const { name, ingredientNames, ingredientActualAmounts, givenAmount, actualAmount, dayIndex } = input;
    let nameNotEmptyOk = valNameNotEmpty(name);

    if (typeof nameNotEmptyOk === 'string') {
        return {
            ok: false,
            message: nameNotEmptyOk
        };
    } else if (ingredientNames.length !== ingredientActualAmounts.length) {
        return {
            ok: false,
            message: 'Ingredient names array and ingredient actual amounts array has a different number of elements. '
        };
    }

    let nameAndIngOk = valFoodIsNotIngOfItself_FoodNotInFoodListAlready_IngDoesNotHaveIng(user, ingredientNames, name!);
    let ingActualAmountsOk = valIngActualAmounts(ingredientActualAmounts);
    let givenAmountOk = valGivenAmount(givenAmount!);
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(actualAmount, dayIndex);
    if (typeof nameAndIngOk === 'string') {
        return {
            ok: false,
            message: nameAndIngOk
        };
    } else if (typeof givenAmountOk === 'string') {
        return {
            ok: false,
            message: givenAmountOk
        };
    } else if (typeof ingActualAmountsOk === 'string') {
        return {
            ok: false,
            message: ingActualAmountsOk
        };
    } else if (typeof actualAmountAndDayIndexOk === 'string') {
        return {
            ok: false,
            message: actualAmountAndDayIndexOk
        };
    }

    return {
        ok: true
    };
};

const editMealListFood_ActualAmount = (input: EditMealListFoodInput_ActualAmount) => {
    const { dayIndex, foodIndex, mealId, newActualAmount } = input;
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(newActualAmount, dayIndex);
    if (typeof actualAmountAndDayIndexOk === 'string') {
        return {
            ok: false,
            message: actualAmountAndDayIndexOk
        };
    }
    return {
        ok: true
    };
};

const deleteMealListFood = (input: DeleteMealListFoodInputReal) => {
    const { dayIndex, foodIndex, mealId } = input;
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(1, dayIndex);
    if (typeof actualAmountAndDayIndexOk === 'string') {
        return {
            ok: false,
            message: actualAmountAndDayIndexOk
        };
    }
    return {
        ok: true
    };
};
// const createMealListFood = (
//     user: IUserDocument,
//     // existingFoodName: string | null | undefined,

//     // name: string | null | undefined,
//     // calories: number | null | undefined,
//     // proteins: number | null | undefined,
//     // carbs: number | null | undefined,
//     // fats: number | null | undefined,
//     // newIngNames: string[],
//     // newIngActualAmounts: number[],

//     // givenAmount: number | null | undefined,
//     // actualAmount: number,
//     // dayIndex: number,
//     // mealId: string
//     input: CreateMealListFoodInput_Existing | CreateMealListFoodInput_NewNoIng | CreateMealListFoodInput_NewIng,
//     typeOfCreate: string
// ) => {
//         let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(input.actualAmount, input.dayIndex);

//     switch (typeOfCreate) {
//         case 'Existing':

//             // return actualAmountAndDayIndexOk.ok ? { ok: true } : { ok: false, message: errorMessage.actualAmountsValid.invalidActualAmount };
//         case 'NewNoIng':

//         case 'NewYesIng':
//     }

//     // let statsOk: string | boolean = true;
//     // if (foodStatsWillBeBasedOnIngredients(calories, proteins, carbs, fats, newIngNames)) {
//     //     statsOk = statsCheck(calories!, proteins!, carbs!, fats!);
//     // }
//     // let nameAndIngOk = uniqueFoodNameAndIngCheck(user, newIngNames, name!);
//     // let newIngActualAmountOk = valIngActualAmounts(newIngActualAmounts);
//     // let givenAmountOk = valGivenAmount(givenAmount!);
//     // if (typeof statsOk === 'string') {
//     //     return {
//     //         ok: false,
//     //         message: statsOk
//     //     };
//     // } else if (typeof nameAndIngOk === 'string') {
//     //     return {
//     //         ok: false,
//     //         message: nameAndIngOk
//     //     };
//     // } else if (typeof newIngActualAmountOk === 'string') {
//     //     return {
//     //         ok: false,
//     //         message: newIngActualAmountOk
//     //     };
//     // } else if (typeof givenAmountOk === 'string') {
//     //     return {
//     //         ok: false,
//     //         message: givenAmountOk
//     //     };
//     // } else if (typeof actualAmountAndDayIndexOk === 'string') {
//     //     return {
//     //         ok: false,
//     //         message: actualAmountAndDayIndexOk
//     //     };
//     // }

//     // return {
//     //     ok: true
//     // };
// };

const validator = {
    register,
    login,

    createFoodList,

    // createMealListFood

    createFoodList_NewNoIng,
    createFoodList_NewYesIng,
    editFoodList_NewNoIng,
    editFoodList_NewYesIng,

    createMealListFood_Existing,
    createOrEditMealListFood_NewNoIng,
    createOrEditMealListFood_NewYesIng,
    editMealListFood_ActualAmount,
    deleteMealListFood
};

export default validator;
