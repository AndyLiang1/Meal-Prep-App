import Joi from 'joi';
import { Meal } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';

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
    if (!calories) {
        return errorMessage.statsCheck.calories;
    }
    if (!proteins) {
        return errorMessage.statsCheck.proteins;
    }
    if (!carbs) {
        return errorMessage.statsCheck.carbs;
    }
    if (!fats) {
        return errorMessage.statsCheck.fats;
    }
    return true;
};

const uniqueFoodNameAndIngCheck = (user: IUserDocument, ingNames: string[], thisFoodName: string) => {
    for (let foodInFoodList of user.foodList) {
        // cannot create a food if it exists in foodList
        if (foodInFoodList.name === thisFoodName) {
            return errorMessage.uniqueFoodNameAndIngCheck.uniqueFoodName;
        }
        for (let ingName of ingNames) {
            if (foodInFoodList.name === ingName) {
                // an ing cannot be this food aka
                // no infinite cycle of food being its own ing
                if (ingName === thisFoodName) {
                    return errorMessage.uniqueFoodNameAndIngCheck.ingOfItself;
                }
                // an ing cannot have ing
                if (foodInFoodList.ingredients.length) {
                    return errorMessage.uniqueFoodNameAndIngCheck.ingHasIng;
                }
            }
        }
    }
    return true;
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
    if (typeof calories === 'number' && typeof proteins === 'number' && typeof carbs === 'number' && typeof fats === 'number') {
        statsOk = statsCheck(calories, proteins, carbs, fats);
    }
    let nameAndIngOk = uniqueFoodNameAndIngCheck(user, newIngNames, name);
    if (statsOk === true && nameAndIngOk === true) {
        return {
            ok: true
        };
    } else {
        if (typeof statsOk === 'string' && typeof nameAndIngOk === 'string') {
            return {
                ok: false,
                message: statsOk + nameAndIngOk
            };
        }

        if (typeof statsOk === 'string') {
            return {
                ok: false,
                message: statsOk
            };
        } else {
            return {
                ok: false,
                message: nameAndIngOk
            };
        }
    }
};

const validator = {
    register,
    login,
    createFoodList
};

export default validator;
