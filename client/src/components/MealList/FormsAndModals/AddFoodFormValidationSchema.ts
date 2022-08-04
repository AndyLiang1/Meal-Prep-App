import * as Yup from 'yup';
const errorShouldBeNumber = 'Please enter a number';
const errorRequired = 'This field is required';
const errorMinValGTOne = 'Please enter a number that is greater than 0';

export const mealListFood_createExisting_Schema = Yup.object({
    existingFoodName: Yup.string().required(errorRequired),
    existingFoodActualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
});

export const mealListFood_newNoIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    calories: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    proteins: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    carbs: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    fats: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    actualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
});

export const mealListFood_newYesIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    actualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
});

export const foodList_newNoIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    calories: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    proteins: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    carbs: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    fats: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
});

export const foodList_newYesIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
});

