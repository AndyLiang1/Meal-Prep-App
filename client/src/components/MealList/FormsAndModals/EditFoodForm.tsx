import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './EditFoodForm.module.css';
import { Formik, Form, Field, useField } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore, setModalStatus, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import { Ingredient } from './Ingredient';
import { useLazyQuery, useMutation } from '@apollo/client';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { DropdownStats } from './DropdownStats';
import {
    EditFoodListDocument,
    EditFoodListInputReal,
    EditFoodListInput_NewNoIng,
    EditFoodListInput_NewYesIng,
    EditFoodListType,
    EditMealListFoodDocument,
    EditMealListFoodInputReal,
    EditMealListFoodInput_ActualAmount,
    EditMealListFoodInput_NewNoIng,
    EditMealListFoodInput_NewYesIng,
    EditMealListFoodType,
    Food
} from '../../../generated/graphql-client';
import { calcTotalStats } from '../../helpers/HelperFunctionsForAddAndEditFood';
import { CustomErrorMessage } from '../../Others/CustomErrorMessage';
import { CloseBtn, DropDownIcon, DropUpIcon } from '../../helpers/Icons';
import {
    foodList_editReplaceNewNoIng_Schema,
    foodList_editReplaceNewYesIng_Schema,
    mealListFood_editActualAmount_Schema,
    mealListFood_editReplaceNewNoIng_Schema,
    mealListFood_editReplaceNewYesIng_Schema
} from './EditFoodFormValidationSchema';

export interface IEditFoodFormProps {
    fromWhere: string;
    food: Food;
    setEditFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
    foodIndex?: number;
}

export type EditFoodFormData = {
    newActualAmount: number;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    ingredients: Food[];
    givenAmount: number;
};

export function EditFoodForm({ fromWhere, food, setEditFoodForm, mealId, foodIndex }: IEditFoodFormProps) {
    const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const [actualAmount, setActualAmount] = useState<number>(0);
    const [newPotentialIngredient, setNewPotentialIngredient] = useState<Food>();
    const [ingredients, setIngredients] = useState<Food[]>(fromWhere === 'foodList' ? food.ingredients : []);

    const dispatch = useDispatch();
    const [editMealListFood] = useMutation(EditMealListFoodDocument);
    const [editFooodList] = useMutation(EditFoodListDocument);

    const [totalStats, setTotalStats] = useState({ calories: food.calories, proteins: food.proteins, carbs: food.carbs, fats: food.carbs });
    const [newIngActualAmount, setNewIngActualAmount] = useState(0);

    const [showIngCals, setShowIngCals] = useState(false);
    const [showIngP, setShowIngP] = useState(false);
    const [showIngC, setShowIngC] = useState(false);
    const [showIngF, setShowIngF] = useState(false);

    const [inputErrorCollection, setInputErrorCollection] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        calcTotalStats(ingredients, setTotalStats);
    }, [ingredients]);

    const initialValues = {
        newActualAmount: '',
        name: fromWhere === 'foodList' ? food.name : '',
        calories: fromWhere === 'foodList' ? food.calories : '',
        proteins: fromWhere === 'foodList' ? food.proteins : '',
        carbs: fromWhere === 'foodList' ? food.carbs : '',
        fats: fromWhere === 'foodList' ? food.fats : '',
        givenAmount: fromWhere === 'foodList' ? food.givenAmount : '',
        actualAmount: ''
    };

    const addToIngredientList = (newIngredientActualAmount: number) => {
        if (newPotentialIngredient) {
            newPotentialIngredient.actualAmount = newIngredientActualAmount;
            const newIngredientsList = [...ingredients];
            newIngredientsList.push(newPotentialIngredient);
            setIngredients(newIngredientsList);
            setNewPotentialIngredient(undefined); // to hide the form
        }
    };

    const turnIngArrToIngNameAndIngActualAmountArrays = () => {
        const ingredientNames = [];
        const ingredientActualAmounts = [];
        for (let ingredient of ingredients) {
            ingredientNames.push(ingredient.name);
            ingredientActualAmounts.push(ingredient.actualAmount!);
        }
        return { ingredientNames, ingredientActualAmounts };
    };

    const handleDeleteIng = (ingredientToDeleteName: string, ingredientToDeleteActualAmount: number) => {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredientToDeleteName === ingredients[i].name && ingredientToDeleteActualAmount === ingredients[i].actualAmount) {
                let newIngredientsList = [...ingredients];
                newIngredientsList.splice(i, 1);
                setIngredients(newIngredientsList);
                break;
            }
        }
    };

    const setUpErrorMessageDisplay = (e: any) => {
        setErrorMsg('');
        const errorPaths: any[] = [];
        const errorMessages: any[] = [];
        e.inner.forEach((error: any) => {
            errorPaths.push(error.path);
            errorMessages.push(error.message);
        });
        setInputErrorCollection({ errorPaths, errorMessages });
    };

    const checkResponseOk = (response: any) => {
        const actualResponse = response.data[Object.keys(response.data)[0]];
        console.log(actualResponse);
        if (!actualResponse.ok) {
            setErrorMsg(actualResponse.message);
            return false;
        }
        return true;
    };

    const submitEditFoodList = async (submittedData: any) => {
        const { name } = submittedData;
        const editNewNoIng = ingredients.length === 0;
        let editResponse;
        switch (editNewNoIng) {
            case true:
                const editFoodListInputNewNoIngInfo: EditFoodListInput_NewNoIng = {
                    oldFoodName: food.name,
                    name,
                    calories: Number(submittedData.calories),
                    proteins: Number(submittedData.proteins),
                    carbs: Number(submittedData.carbs),
                    fats: Number(submittedData.fats),
                    givenAmount: Number(submittedData.givenAmount)
                };
                const editFoodListInputNewNoIng: EditFoodListInputReal = {
                    editType: 'NEW_NO_ING' as EditFoodListType,
                    inputNewNoIng: editFoodListInputNewNoIngInfo
                };
                editResponse = await editFooodList({
                    variables: {
                        input: editFoodListInputNewNoIng
                    }
                });
                break;
            case false:
                const { ingredientNames, ingredientActualAmounts } = turnIngArrToIngNameAndIngActualAmountArrays();
                const editFoodListInputNewYesIngInfo: EditFoodListInput_NewYesIng = {
                    oldFoodName: food.name,
                    name,
                    ingredientNames,
                    ingredientActualAmounts,
                    givenAmount: Number(submittedData.givenAmount)
                };
                const editFoodListInputNewYesIng: EditFoodListInputReal = {
                    editType: 'NEW_YES_ING' as EditFoodListType,
                    inputNewYesIng: editFoodListInputNewYesIngInfo
                };
                editResponse = await editFooodList({
                    variables: {
                        input: editFoodListInputNewYesIng
                    }
                });
                break;
            default:
                break;
        }
        if (!checkResponseOk(editResponse)) {
            return;
        }
        dispatch(triggerRefetch());
        dispatch(setModalStatus(false));
        setEditFoodForm(false);
    };

    const submitEditMealListFood = async (submittedData: any) => {
        const editActualAmount = submittedData.newActualAmount !== '';
        let editResponse;

        switch (editActualAmount) {
            case true:
                const editMealListFoodInputActualAmountInfo: EditMealListFoodInput_ActualAmount = {
                    foodIndex: foodIndex!,
                    newActualAmount: Number(submittedData.newActualAmount),
                    dayIndex,
                    mealId: mealId!
                };
                const editMealListFoodInputAcualAmount: EditMealListFoodInputReal = {
                    editType: 'ACTUAL_AMOUNT' as EditMealListFoodType,
                    inputActualAmount: editMealListFoodInputActualAmountInfo
                };
                editResponse = await editMealListFood({
                    variables: {
                        input: editMealListFoodInputAcualAmount
                    }
                });
                break;
            case false:
                const createNewNoIng = ingredients.length === 0;
                switch (createNewNoIng) {
                    case true:
                        const editMealListFoodInputNewNoIngInfo: EditMealListFoodInput_NewNoIng = {
                            name: submittedData.name,
                            calories: Number(submittedData.calories),
                            proteins: Number(submittedData.proteins),
                            carbs: Number(submittedData.carbs),
                            fats: Number(submittedData.fats),

                            givenAmount: Number(submittedData.givenAmount),
                            actualAmount: Number(submittedData.actualAmount),

                            foodIndex: foodIndex!,
                            dayIndex,
                            mealId: mealId!
                        };
                        const editMealListFoodInputNewNoIng: EditMealListFoodInputReal = {
                            editType: 'NEW_NO_ING' as EditMealListFoodType,
                            inputNewNoIng: editMealListFoodInputNewNoIngInfo
                        };
                        editResponse = await editMealListFood({
                            variables: {
                                input: editMealListFoodInputNewNoIng
                            }
                        });
                        break;
                    case false:
                        const { ingredientNames, ingredientActualAmounts } = turnIngArrToIngNameAndIngActualAmountArrays();
                        const editMealListFoodInputNewYesIngInfo: EditMealListFoodInput_NewYesIng = {
                            name: submittedData.name,
                            ingredientNames,
                            ingredientActualAmounts,

                            givenAmount: Number(submittedData.givenAmount),
                            actualAmount: Number(submittedData.actualAmount),

                            foodIndex: foodIndex!,
                            dayIndex,
                            mealId: mealId!
                        };
                        const editMealListFoodInputNewYesIng: EditMealListFoodInputReal = {
                            editType: 'NEW_YES_ING' as EditMealListFoodType,
                            inputNewYesIng: editMealListFoodInputNewYesIngInfo
                        };
                        editResponse = await editMealListFood({
                            variables: {
                                input: editMealListFoodInputNewYesIng
                            }
                        });
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        if (!checkResponseOk(editResponse)) {
            return;
        }
        dispatch(triggerRefetch());
        dispatch(setModalStatus(false));
        setEditFoodForm(false);
    };

    const handleSubmit = async (submittedData: any) => {
        const { newActualAmount, name, calories, proteins, carbs, fats, givenAmount, actualAmount } = submittedData;

        const editByAdjustingActualAmount = newActualAmount !== '';
        const editByCreatingNewFood = name !== '' || calories !== '' || proteins !== '' || carbs !== '' || fats !== '' || ingredients.length !== 0 || givenAmount !== '' || actualAmount !== '';
        const editNewNoIng = ingredients.length === 0;

        if (editByAdjustingActualAmount && editByCreatingNewFood) {
            setErrorMsg('Please only use one of the options to add a food to this meal. Either add an existing food, or create a new food with a unique name.');
            setInputErrorCollection(null);
            return;
        }

        if (!editByAdjustingActualAmount && !editByCreatingNewFood) {
            setErrorMsg('Please fill out the form');
            setInputErrorCollection(null);
            return;
        }

        if (editByAdjustingActualAmount) {
            try {
                await mealListFood_editActualAmount_Schema.validate({ newActualAmount }, { abortEarly: false });
            } catch (e: any) {
                setUpErrorMessageDisplay(e);
                return;
            }
        }

        if (editByCreatingNewFood) {
            switch (fromWhere) {
                case 'foodList':
                    switch (editNewNoIng) {
                        case true:
                            try {
                                await foodList_editReplaceNewNoIng_Schema.validate({ name, calories, proteins, carbs, fats, givenAmount }, { abortEarly: false });
                            } catch (e: any) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        case false:
                            try {
                                await foodList_editReplaceNewYesIng_Schema.validate({ name, givenAmount }, { abortEarly: false });
                            } catch (e: any) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'mealList':
                    switch (editNewNoIng) {
                        case true:
                            try {
                                await mealListFood_editReplaceNewNoIng_Schema.validate({ name, calories, proteins, carbs, fats, givenAmount, actualAmount }, { abortEarly: false });
                            } catch (e: any) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        case false:
                            try {
                                await mealListFood_editReplaceNewYesIng_Schema.validate({ name, givenAmount, actualAmount }, { abortEarly: false });
                            } catch (e: any) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
        // if (fromWhere === 'mealList') {
        //     const editFoodFromMealArgs: EditFoodInput = {
        //         userId: user.id,
        //         dayIndex,
        //         mealId,
        //         foodIndex,
        //         newActualAmount: parseInt(submittedData.newActualAmount)
        //     };

        //     const { data } = await editFoodFromMealList({
        //         variables: {
        //             input: editFoodFromMealArgs
        //         }
        //     });
        // } else if (fromWhere === 'foodList') {
        //     const { newFoodName, newIngredient, newGivenAmount } = submittedData;
        //     const newIngredientNames: string[] = [];
        //     ingredients.forEach((ingredient) => newIngredientNames.push(ingredient.name));

        //     const editFoodFromMealArgs: EditFoodInput = {
        //         userId: user.id,
        //         foodName: food.name,
        //         newFoodName,
        //         newCalories: totalStats.calories,
        //         newProteins: totalStats.proteins,
        //         newCarbs: totalStats.carbs,
        //         newFats: totalStats.fats,
        //         newIngredientNames,
        //         newGivenAmount,
        //         newActualAmount: newGivenAmount
        //     };
        //     const { data } = await editFoodFromFoodList({
        //         variables: {
        //             input: editFoodFromMealArgs
        //         }
        //     });
        // }
        switch (fromWhere) {
            case 'mealList':
                submitEditMealListFood(submittedData);
                break;
            case 'foodList':
                submitEditFoodList(submittedData);
                break;
        }
        dispatch(setModalStatus(false));
        setEditFoodForm(false);
    };

    return (
        <div className={styles.container}>
            <CloseBtn
                className={styles.close_btn}
                type="button"
                onClick={() => {
                    dispatch(setModalStatus(false));
                    setEditFoodForm(false);
                }}
            ></CloseBtn>
            <div className={styles.title_container}>{fromWhere === 'meal' ? <div className={styles.title}>Edit food in meal</div> : <div className={styles.title}>Edit food in food list</div>}</div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className={styles.form}>
                    <div className={styles.form_container}>
                        <CustomErrorMessage errorMessage={errorMsg} displayFixedMessage={errorMsg !== ''} />
                        {fromWhere === 'mealList' && (
                            <div>
                                <div className={styles.sub_title}>Edit Food By Adjusting Actual Amount Used</div>
                                <div className={styles.edit_actual_amount_container}>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>Cals: </div>
                                        <div className={styles.amount}>{((food.calories * food.actualAmount!) / food.givenAmount).toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>P:</div>
                                        <div className={styles.amount}>{((food.proteins * food.actualAmount!) / food.givenAmount).toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>C:</div>
                                        <div className={styles.amount}>{((food.carbs * food.actualAmount!) / food.givenAmount).toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>F:</div>
                                        <div className={styles.amount}>{((food.fats * food.actualAmount!) / food.givenAmount).toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>Given Amount:</div>
                                        <div className={styles.amount}>{food.givenAmount.toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>Actual Amount:</div>
                                        <div className={styles.amount}>{food.actualAmount!.toFixed(0)}</div>
                                    </div>
                                    <div className={styles.label_amount_container}>
                                        <div className={styles.edit_label}>New Actual Amount:</div>
                                        <Field className={styles.edit_field_newActualAmount} name="newActualAmount"></Field>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={styles.edit_by_stats_container}>
                            {fromWhere === 'mealList' ? <div className={styles.sub_title}>Edit By Replacing With New Food</div> : <div className={styles.sub_title}>Edit Food</div>}
                            {fromWhere === 'foodList' && <div>Note: This will edit every instance of this food in your meal lists across all 7 days.</div>}
                            <div className={styles.edit_label}>Name</div>
                            <Field className={styles.edit_field} name="name" />
                            <CustomErrorMessage name="name" errorCollection={inputErrorCollection} />

                            <div className={styles.edit_label}>Ingredients</div>
                            <Field
                                className={styles.edit_field}
                                name="ingredients"
                                as="select"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newIngName = e.target.value;
                                    user.foodList.forEach((food) => {
                                        if (food.name === newIngName) {
                                            let ingredient = {
                                                ...food
                                            };
                                            setNewPotentialIngredient(ingredient);
                                            setNewIngActualAmount(ingredient.givenAmount);
                                        }
                                    });
                                }}
                                value={newPotentialIngredient ? newPotentialIngredient.name : '--'}
                            >
                                <option value=""></option>
                                {user.foodList.map((food: Food, index: number) => {
                                    return (
                                        <option key={index} value={food.name}>
                                            {food.name}
                                        </option>
                                    );
                                })}
                            </Field>
                            <div className={styles.ing_container}>
                                {ingredients.map((food: Food, index: number) => {
                                    return <Ingredient key={index} ingredient={food} onDeleteIng={handleDeleteIng}></Ingredient>;
                                })}
                            </div>
                            {newPotentialIngredient && (
                                <div className={styles.potentialNewIng}>
                                    <div>
                                        {newPotentialIngredient.name} | Given Amt: {newPotentialIngredient.givenAmount}
                                        {''}
                                    </div>
                                    <div className={styles.potentialNewIng_AA_container}>
                                        <div>Actual Amt</div>
                                        <div> </div>
                                        <Field
                                            className={styles.potentialIngActualAmount}
                                            type="number"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewIngActualAmount(parseInt(e.target.value))}
                                            value={newIngActualAmount}
                                        ></Field>
                                    </div>

                                    <button type="button" className="btn btn-primary" onClick={() => addToIngredientList(newIngActualAmount)}>
                                        Add Ingredient to Food
                                    </button>
                                </div>
                            )}
                            {!ingredients.length ? (
                                <div>
                                    <div className={styles.edit_label}>Calories</div>
                                    <Field className={styles.edit_field} name="calories" />
                                    <CustomErrorMessage name="calories" errorCollection={inputErrorCollection} />

                                    <div className={styles.edit_label}>Proteins</div>
                                    <Field className={styles.edit_field} name="proteins" />
                                    <CustomErrorMessage name="proteins" errorCollection={inputErrorCollection} />

                                    <div className={styles.edit_label}>Carbs</div>
                                    <Field className={styles.edit_field} name="carbs" />
                                    <CustomErrorMessage name="carbs" errorCollection={inputErrorCollection} />

                                    <div className={styles.edit_label}>Fats</div>
                                    <Field className={styles.edit_field} name="fats" />
                                    <CustomErrorMessage name="fats" errorCollection={inputErrorCollection} />
                                </div>
                            ) : (
                                <div>
                                    <div className={styles.stats_container}>
                                        <div className={styles.stats_name_and_dropdown}>
                                            <div className={styles.stats_info}>Calories: {totalStats.calories.toFixed(0)}</div>
                                            {!showIngCals ? (
                                                <DropDownIcon
                                                    className={styles.stats_display_toggle}
                                                    onClick={() => {
                                                        setShowIngCals(true);
                                                    }}
                                                ></DropDownIcon>
                                            ) : (
                                                <DropUpIcon className={styles.stats_display_toggle} onClick={() => setShowIngCals(false)} />
                                            )}
                                        </div>
                                        {showIngCals && <DropdownStats statName={'calories'} ingredients={ingredients}></DropdownStats>}
                                    </div>
                                    <div className={styles.stats_container}>
                                        <div className={styles.stats_name_and_dropdown}>
                                            <div className={styles.stats_info}>Proteins: {totalStats.proteins.toFixed(2)}</div>
                                            {!showIngP ? (
                                                <DropDownIcon
                                                    className={styles.stats_display_toggle}
                                                    onClick={() => {
                                                        setShowIngP(true);
                                                    }}
                                                ></DropDownIcon>
                                            ) : (
                                                <DropUpIcon className={styles.stats_display_toggle} onClick={() => setShowIngP(false)} />
                                            )}
                                        </div>
                                        {showIngP && <DropdownStats statName={'proteins'} ingredients={ingredients}></DropdownStats>}
                                    </div>
                                    <div className={styles.stats_container}>
                                        <div className={styles.stats_name_and_dropdown}>
                                            <div className={styles.stats_info}>Carbs: {totalStats.carbs.toFixed(2)}</div>
                                            {!showIngC ? (
                                                <DropDownIcon
                                                    className={styles.stats_display_toggle}
                                                    onClick={() => {
                                                        setShowIngC(true);
                                                    }}
                                                ></DropDownIcon>
                                            ) : (
                                                <DropUpIcon className={styles.stats_display_toggle} onClick={() => setShowIngC(false)} />
                                            )}
                                        </div>
                                        {showIngC && <DropdownStats statName={'carbs'} ingredients={ingredients} />}
                                    </div>
                                    <div className={styles.stats_container}>
                                        <div className={styles.stats_name_and_dropdown}>
                                            <div className={styles.stats_info}>Fats: {totalStats.fats.toFixed(2)}</div>
                                            {!showIngF ? (
                                                <DropDownIcon
                                                    className={styles.stats_display_toggle}
                                                    onClick={() => {
                                                        setShowIngF(true);
                                                    }}
                                                ></DropDownIcon>
                                            ) : (
                                                <DropUpIcon className={styles.stats_display_toggle} onClick={() => setShowIngF(false)} />
                                            )}
                                        </div>
                                        {showIngF && <DropdownStats statName={'fats'} ingredients={ingredients}></DropdownStats>}
                                    </div>
                                </div>
                            )}

                            <div className={styles.edit_label}>Given Amount</div>
                            <Field className={styles.edit_field} name="givenAmount" />
                            <CustomErrorMessage name="givenAmount" errorCollection={inputErrorCollection} />
                            {fromWhere === 'mealList' && (
                                <div className={styles.actual_amount_container}>
                                    <div className={styles.edit_label}>Actual Amount</div>
                                    <Field className={styles.edit_field} name="actualAmount" />
                                    <CustomErrorMessage name="actualAmount" errorCollection={inputErrorCollection} />
                                </div>
                            )}
                            <CustomErrorMessage errorMessage={errorMsg} displayFixedMessage={errorMsg !== ''} />
                            <div className={styles.btn_container}>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        fontSize: '16px'
                                    }}
                                    type="submit"
                                >
                                    Edit Food
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
