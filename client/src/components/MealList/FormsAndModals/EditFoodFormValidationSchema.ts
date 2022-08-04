import * as Yup from 'yup';

const errorShouldBeNumber = 'Please enter a number';
const errorRequired = 'This field is required';
const errorMinValGTOne = 'Please enter a number that is greater than 0.01';

export const mealListFood_editActualAmount_Schema = Yup.object({
    newActualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
});

export const mealListFood_editReplaceNewNoIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    calories: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    proteins: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    carbs: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    fats: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    actualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
})

export const mealListFood_editReplaceNewYesIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    actualAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne)
})

export const foodList_editReplaceNewNoIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    calories: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    proteins: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    carbs: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    fats: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
});

export const foodList_editReplaceNewYesIng_Schema = Yup.object({
    name: Yup.string().required(errorRequired),
    givenAmount: Yup.number().typeError(errorShouldBeNumber).required(errorRequired).min(0.01, errorMinValGTOne),
})

