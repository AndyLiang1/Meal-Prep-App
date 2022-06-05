import Joi from 'joi';
import { Meal } from '../generated/graphql-server';
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

    uniqueFoodNameAndIngCheck: {
        uniqueFoodName: 'Cannot create a food if it already exists in foodList. ',
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

const statsCheck = (calories: number, proteins: number, carbs: number, fats: number) => {
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

const uniqueFoodNameAndIngCheck = (user: IUserDocument, ingNames: string[], thisFoodName: string) => {
    for (let foodName of ingNames) {
        // no infinite cycle of food being its own ing
        if (thisFoodName === foodName) {
            return errorMessage.uniqueFoodNameAndIngCheck.ingOfItself;
        }
    }
    for (let foodInFoodList of user.foodList) {
        // cannot create a food if it exists in foodList
        if (foodInFoodList.name === thisFoodName) {
            return errorMessage.uniqueFoodNameAndIngCheck.uniqueFoodName;
        }
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

const ingActualAmountsValid = (ingActualAmounts: number[]) => {
    for (let actualAmount of ingActualAmounts) {
        if (actualAmount <= 0) {
            return errorMessage.actualAmountsValid.invalidActualAmount;
        }
    }
};

const givenAmountValid = (givenAmount: number) => {
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
        statsOk = statsCheck(calories!, proteins!, carbs!, fats!);
    }
    let nameAndIngOk = uniqueFoodNameAndIngCheck(user, newIngNames, name);
    let newIngActualAmountOk = ingActualAmountsValid(newIngActualAmounts);
    let givenAmountOk = givenAmountValid(givenAmount);

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

const createMealListFood = (
    user: IUserDocument,
    existingFoodName: string | null | undefined,

    name: string | null | undefined,
    calories: number | null | undefined,
    proteins: number | null | undefined,
    carbs: number | null | undefined,
    fats: number | null | undefined,
    newIngNames: string[],
    newIngActualAmounts: number[],

    givenAmount: number | null | undefined,
    actualAmount: number,
    dayIndex: number,
    mealId: string
) => {
    if (existingFoodName) {
        actualAmount > 0 ? { ok: true } : { ok: false, message: errorMessage.actualAmountsValid.invalidActualAmount };
    }
    let statsOk: string | boolean = true;
    if (foodStatsWillBeBasedOnIngredients(calories, proteins, carbs, fats, newIngNames)) {
        statsOk = statsCheck(calories!, proteins!, carbs!, fats!);
    }
    let nameAndIngOk = uniqueFoodNameAndIngCheck(user, newIngNames, name!);
    let newIngActualAmountOk = ingActualAmountsValid(newIngActualAmounts);
    let givenAmountOk = givenAmountValid(givenAmount!);
    let actualAmountAndDayIndexOk = actualAmountAndDayIndexValid(actualAmount, dayIndex);
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

const validator = {
    register,
    login,
    createFoodList,
    createMealListFood
};

export default validator;
