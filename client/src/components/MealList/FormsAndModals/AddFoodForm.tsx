import { Formik, Form, Field, setIn, ErrorMessage } from 'formik';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
// import { CreateFoodFromFoodListDocument, CreateFoodFromMealDocument, CreateFoodInput, Food, GetMealsDocument } from '../../../generated/graphql-client';
import { addUserToStore, setModalStatus, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import styles from './AddFoodForm.module.css';
import { Ingredient } from './Ingredient';

import { useWhatChanged, setUseWhatChange } from '@simbathesailor/use-what-changed';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DropdownStats } from './DropdownStats';
import { create } from 'yup/lib/Reference';
import {
    CreateFoodListDocument,
    CreateMealListFoodDocument,
    Food,
    CreateFoodListInput_NewNoIng,
    CreateFoodListInputReal,
    CreateFoodListType,
    CreateFoodListInput_NewYesIng,
    CreateMealListFoodInput_Existing,
    CreateMealListFoodInputReal,
    CreateMealListFoodType,
    CreateMealListFoodInput_NewNoIng,
    CreateMealListFoodInput_NewYesIng,
    CreateFoodListResponse
} from '../../../generated/graphql-client';
import { CloseBtn, DropDownIcon, DropUpIcon } from '../../helpers/Icons';
import { CustomErrorMessage } from '../../Others/CustomErrorMessage';
import { foodList_newNoIng_Schema, mealListFood_createExisting_Schema, mealListFood_newNoIng_Schema } from './AddFoodFormValidationSchema';
import { calcTotalStats } from '../../helpers/HelperFunctionsForAddAndEditFood';

export interface IAddFoodFormProps {
    fromWhere: string;
    setAddFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
}

interface CreateFoodFromMealInput {
    existingFoodName: string;
    existingFoodActualAmount: any;
    name: string;
    calories: any;
    proteins: any;
    carbs: any;
    fats: any;
    givenAmount: any;
    actualAmount: any;
}

export function AddFoodForm({ fromWhere, setAddFoodForm, mealId }: IAddFoodFormProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const [newPotentialIngredient, setNewPotentialIngredient] = useState<Food>();
    const [ingredients, setIngredients] = useState<Food[]>([]);
    const [newIngActualAmount, setNewIngActualAmount] = useState(0);

    const dispatch = useDispatch();
    const [createMealListFood] = useMutation(CreateMealListFoodDocument);
    const [createFoodList] = useMutation(CreateFoodListDocument);

    const [showIngCals, setShowIngCals] = useState(false);
    const [showIngP, setShowIngP] = useState(false);
    const [showIngC, setShowIngC] = useState(false);
    const [showIngF, setShowIngF] = useState(false);
    const [totalStats, setTotalStats] = useState({
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0
    });

    const [inputErrorCollection, setInputErrorCollection] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        calcTotalStats(ingredients, setTotalStats);
    }, [ingredients]);

    const initialValues: any = {
        existingFoodName: '',
        existingFoodActualAmount: '',
        name: '',
        calories: '',
        proteins: '',
        carbs: '',
        fats: '',
        givenAmount: '',
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

    const submitAddFoodList = async (submittedData: CreateFoodFromMealInput) => {
        const createNewNoIng = ingredients.length === 0;
        let createResponse;
        switch (createNewNoIng) {
            case true:
                const createFoodListInputNewNoIngInfo: CreateFoodListInput_NewNoIng = {
                    name: submittedData.name,
                    calories: Number(submittedData.calories),
                    proteins: Number(submittedData.proteins),
                    carbs: Number(submittedData.carbs),
                    fats: Number(submittedData.fats),
                    givenAmount: Number(submittedData.givenAmount)
                };
                const createFoodListInputNewNoIng: CreateFoodListInputReal = {
                    createType: 'NEW_NO_ING' as CreateFoodListType,
                    inputNewNoIng: createFoodListInputNewNoIngInfo
                };
                createResponse = await createFoodList({
                    variables: {
                        input: createFoodListInputNewNoIng
                    }
                });
                break;
            case false:
                const { ingredientNames, ingredientActualAmounts } = turnIngArrToIngNameAndIngActualAmountArrays();
                const createFoodListInputNewYesIngInfo: CreateFoodListInput_NewYesIng = {
                    name: submittedData.name,
                    ingredientNames,
                    ingredientActualAmounts,
                    givenAmount: Number(submittedData.givenAmount)
                };

                const createFoodListInputNewYesIng: CreateFoodListInputReal = {
                    createType: 'NEW_YES_ING' as CreateFoodListType,
                    inputNewYesIng: createFoodListInputNewYesIngInfo
                };

                createResponse = await createFoodList({
                    variables: {
                        input: createFoodListInputNewYesIng
                    }
                });
                break;
            default:
                break;
        }
        if (!checkResponseOk(createResponse)) {
            return;
        }
        dispatch(triggerRefetch());
        dispatch(setModalStatus(false));
        setAddFoodForm(false);
    };

    const submitAddMealListFood = async (submittedData: CreateFoodFromMealInput) => {
        const createFromExistingFood = submittedData.existingFoodName !== '';
        let createResponse;
        switch (createFromExistingFood) {
            case true:
                const createMealListFoodInputExistingInfo: CreateMealListFoodInput_Existing = {
                    existingFoodName: submittedData.existingFoodName,
                    actualAmount: Number(submittedData.existingFoodActualAmount),
                    dayIndex,
                    mealId: mealId!
                };
                const createMealListFoodInputExisting: CreateMealListFoodInputReal = {
                    createType: 'EXISTING' as CreateMealListFoodType,
                    inputExisting: createMealListFoodInputExistingInfo
                };
                createResponse = await createMealListFood({
                    variables: {
                        input: createMealListFoodInputExisting
                    }
                });
                break;
            case false:
                const createNewNoIng = ingredients.length === 0;
                switch (createNewNoIng) {
                    case true:
                        const createMealListFoodInputNewNoIngInfo: CreateMealListFoodInput_NewNoIng = {
                            name: submittedData.name,
                            calories: Number(submittedData.calories),
                            proteins: Number(submittedData.proteins),
                            carbs: Number(submittedData.carbs),
                            fats: Number(submittedData.fats),

                            givenAmount: Number(submittedData.givenAmount),
                            actualAmount: Number(submittedData.actualAmount),

                            dayIndex,
                            mealId: mealId!
                        };
                        const createMealListFoodInputNewNoIng: CreateMealListFoodInputReal = {
                            createType: 'NEW_NO_ING' as CreateMealListFoodType,
                            inputNewNoIng: createMealListFoodInputNewNoIngInfo
                        };
                        createResponse = await createMealListFood({
                            variables: {
                                input: createMealListFoodInputNewNoIng
                            }
                        });
                        break;
                    case false:
                        const { ingredientNames, ingredientActualAmounts } = turnIngArrToIngNameAndIngActualAmountArrays();
                        const createMealListFoodInputNewYesIngInfo: CreateMealListFoodInput_NewYesIng = {
                            name: submittedData.name,
                            ingredientNames,
                            ingredientActualAmounts,

                            givenAmount: Number(submittedData.givenAmount),
                            actualAmount: Number(submittedData.actualAmount),

                            dayIndex,
                            mealId: mealId!
                        };
                        const createMealListFoodInputNewYesIng: CreateMealListFoodInputReal = {
                            createType: 'NEW_YES_ING' as CreateMealListFoodType,
                            inputNewYesIng: createMealListFoodInputNewYesIngInfo
                        };
                        createResponse = await createMealListFood({
                            variables: {
                                input: createMealListFoodInputNewYesIng
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
        if (!checkResponseOk(createResponse)) {
            return;
        }
        dispatch(triggerRefetch());
        dispatch(setModalStatus(false));
        setAddFoodForm(false);
    };

    const handleSubmit = async (submittedData: CreateFoodFromMealInput) => {
        const { existingFoodName, existingFoodActualAmount, name, calories, proteins, carbs, fats, givenAmount, actualAmount } = submittedData;

        const createExisting = existingFoodName !== '' || existingFoodActualAmount !== '';
        const createNew = name !== '' || calories !== '' || proteins !== '' || carbs !== '' || fats !== '' || ingredients.length !== 0 || givenAmount !== '' || actualAmount !== '';
        const createNewNoIng = ingredients.length === 0;

        if (createExisting && createNew) {
            setErrorMsg('Please only use one of the options to add a food to this meal. Either add an existing food, or create a new food with a unique name.');
            setInputErrorCollection(null);
            return;
        }

        if (!createExisting && !createNew) {
            setErrorMsg('Please fill out the form');
            setInputErrorCollection(null);
            return;
        }
        if (createExisting) {
            try {
                await mealListFood_createExisting_Schema.validate({ existingFoodName, existingFoodActualAmount }, { abortEarly: false });
            } catch (e: any) {
                setUpErrorMessageDisplay(e);
                return;
            }
        }

        if (createNew) {
            switch (fromWhere) {
                case 'foodList':
                    switch (createNewNoIng) {
                        case true:
                            try {
                                await foodList_newNoIng_Schema.validate(
                                    {
                                        name,
                                        calories,
                                        proteins,
                                        carbs,
                                        fats,
                                        givenAmount
                                    },
                                    { abortEarly: false }
                                );
                            } catch (e) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        case false:
                            try {
                                await foodList_newNoIng_Schema.validate(
                                    {
                                        name,
                                        givenAmount
                                    },
                                    { abortEarly: false }
                                );
                            } catch (e) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'mealList':
                    switch (createNewNoIng) {
                        case true:
                            try {
                                await mealListFood_newNoIng_Schema.validate(
                                    {
                                        name,
                                        calories,
                                        proteins,
                                        carbs,
                                        fats,
                                        givenAmount,
                                        actualAmount
                                    },
                                    { abortEarly: false }
                                );
                            } catch (e: any) {
                                setUpErrorMessageDisplay(e);
                                return;
                            }
                            break;
                        case false:
                            try {
                                await foodList_newNoIng_Schema.validate(
                                    {
                                        name,
                                        givenAmount,
                                        actualAmount
                                    },
                                    { abortEarly: false }
                                );
                            } catch (e) {
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

        switch (fromWhere) {
            case 'mealList':
                await submitAddMealListFood(submittedData);
                break;
            case 'foodList':
                await submitAddFoodList(submittedData);
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.container}>
            <CloseBtn
                className={styles.close_btn}
                type="button"
                onClick={() => {
                    dispatch(setModalStatus(false));
                    setAddFoodForm(false);
                }}
            ></CloseBtn>
            <div className={styles.title_container}>{fromWhere === 'mealList' ? <div className={styles.title}>Add food to meal</div> : <div className={styles.title}>Add food to food list</div>}</div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.form_container}>
                            <CustomErrorMessage errorMessage={errorMsg} displayFixedMessage={errorMsg !== ''} />
                            {fromWhere === 'mealList' && (
                                <div className={styles.existing_food_container}>
                                    <div className={styles.sub_title}>Add by using an existing food</div>
                                    <div className={styles.add_label}>Existing food</div>
                                    <Field className={styles.add_field} name="existingFoodName" as="select">
                                        <option value=""></option>
                                        {user.foodList!.map((food: Food, index: number) => {
                                            return (
                                                <option key={index} value={food.name}>
                                                    {food.name}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                    <CustomErrorMessage name="existingFoodName" errorCollection={inputErrorCollection} />
                                    <div className={styles.add_label}>Actual Amount</div>
                                    <Field className={styles.add_field} name="existingFoodActualAmount"></Field>
                                    <CustomErrorMessage name="existingFoodActualAmount" errorCollection={inputErrorCollection} />
                                </div>
                            )}
                            <div className={styles.create_new_food_container}>
                                <div className={styles.sub_title}>Add by creating a new food</div>

                                <div className={styles.add_label}>Name</div>
                                <Field className={styles.add_field} name="name" type="text" />
                                <CustomErrorMessage name="name" errorCollection={inputErrorCollection} />

                                <div className={styles.add_label}>Ingredients</div>
                                <Field
                                    className={styles.add_field}
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
                                        <div className={styles.add_label}>Calories</div>
                                        <Field className={styles.add_field} name="calories" />
                                        <CustomErrorMessage name="calories" errorCollection={inputErrorCollection} />

                                        <div className={styles.add_label}>Proteins</div>
                                        <Field className={styles.add_field} name="proteins" />
                                        <CustomErrorMessage name="proteins" errorCollection={inputErrorCollection} />

                                        <div className={styles.add_label}>Carbs</div>
                                        <Field className={styles.add_field} name="carbs" />
                                        <CustomErrorMessage name="carbs" errorCollection={inputErrorCollection} />

                                        <div className={styles.add_label}>Fats</div>
                                        <Field className={styles.add_field} name="fats" />
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

                                <div className={styles.add_label}>Given Amount</div>
                                <Field className={styles.add_field} name="givenAmount" />
                                <CustomErrorMessage name="givenAmount" errorCollection={inputErrorCollection} />
                                {fromWhere === 'mealList' && (
                                    <div className={styles.actual_amount_container}>
                                        <div className={styles.add_label}>Actual Amount</div>
                                        <Field className={styles.add_field} name="actualAmount" />
                                        <CustomErrorMessage name="actualAmount" errorCollection={inputErrorCollection} />
                                    </div>
                                )}
                            </div>
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
                                    Add Food
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
