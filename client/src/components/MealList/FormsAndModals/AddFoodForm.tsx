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
    CreateMealListFoodInput_NewYesIng
} from '../../../generated/graphql-client';
import { CloseBtn, DropDownIcon, DropUpIcon } from '../../helpers/Icons';

export interface IAddFoodFormProps {
    createType: string;
    setAddFoodForm: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
}

interface CreateFoodFromMealInput {
    existingFoodName: string;
    existingFoodActualAmount: number;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    ingredients: Food[];
    givenAmount: number;
    actualAmount: number;
}

export function AddFoodForm({ createType, setAddFoodForm, mealId }: IAddFoodFormProps) {
    const { modalStatus } = useSelector((state: IRootState) => state);
    const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const [newPotentialIngredient, setNewPotentialIngredient] = useState<Food>();
    const [ingredients, setIngredients] = useState<Food[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');
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

    const initialValues: any = {
        existingFoodName: '',
        existingFoodActualAmount: '',
        name: '',
        calories: '',
        proteins: '',
        carbs: '',
        fats: '',
        ingredients: [],
        givenAmount: '',
        actualAmount: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(50),
        calories: Yup.number().typeError('Input a number please').integer().min(1),
        proteins: Yup.number().typeError('Input a number please').min(1),
        carbs: Yup.number().typeError('Input a number please').min(1),
        fats: Yup.number().typeError('Input a number please').min(1),
        givenAmount: Yup.number().typeError('Input a number please').integer().min(1),
        actualAmount: Yup.number().typeError('Input a number please').integer().min(1)
    });

    // useEffect(() => {
    //     for (let i = 0; i < user.foodList!.length; i++) {
    //         if (setNewPotentialIngredient.name === user.foodList![i].name) {
    //             const foodToAdd = user.foodList![i];
    //             const newIngredientsList = ingredients;
    //             newIngredientsList.push(foodToAdd);
    //             setIngredients(newIngredientsList);
    //         }
    //     }
    //     // This allows us to add the same ingredient twice,
    //     setNewPotentialIngredient('');
    // }, [newPotentialIngredient]);

    const addToIngredientList = (newIngredientActualAmount: number) => {
        if (newPotentialIngredient) {
            newPotentialIngredient.actualAmount = newIngredientActualAmount;
            const newIngredientsList = [...ingredients];
            newIngredientsList.push(newPotentialIngredient);
            setIngredients(newIngredientsList);
            setNewPotentialIngredient(undefined); // to hide the form
        }
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
    const calcTotalStats = () => {
        let cals = 0,
            p = 0,
            c = 0,
            f = 0;
        ingredients.forEach((ingredient) => {
            const { calories, proteins, carbs, fats, givenAmount, actualAmount } = ingredient;
            cals += Number(((calories * actualAmount!) / givenAmount).toFixed(0));
            p += Number(((proteins * actualAmount!) / givenAmount).toFixed(2));
            c += Number(((carbs * actualAmount!) / givenAmount).toFixed(2));
            f += Number(((fats * actualAmount!) / givenAmount).toFixed(2));
        });
        setTotalStats({
            calories: cals,
            proteins: p,
            carbs: c,
            fats: f
        });
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

    useEffect(() => {
        calcTotalStats();
    }, [ingredients]);

    const submitFoodList = async (submittedData: CreateFoodFromMealInput) => {
        const createNewNoIng = ingredients.length === 0;
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
                await createFoodList({
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

                await createFoodList({
                    variables: {
                        input: createFoodListInputNewYesIng
                    }
                });
                break;
            default:
                break;
        }
    };

    const submitMealListFood = async (submittedData: CreateFoodFromMealInput) => {
        const createFromExistingFood = submittedData.existingFoodName !== '';
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
                console.log(createMealListFoodInputExisting);
                await createMealListFood({
                    variables: {
                        input: createMealListFoodInputExisting
                    }
                });
                break;
            default:
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
                        await createMealListFood({
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
                        await createMealListFood({
                            variables: {
                                input: createMealListFoodInputNewYesIng
                            }
                        });
                        break;
                    default:
                        break;
                }
                break;
        }
    };

    const handleSubmit = async (submittedData: CreateFoodFromMealInput) => {
        if (submittedData.existingFoodName !== '' && submittedData.name !== '') {
            setErrorMsg('Please only use one of the options to add a food to this meal. Either add an existing food, or create a new food with a unique name.');
            return;
        }
        switch (createType) {
            case 'mealListFood':
                await submitMealListFood(submittedData);
                break;
            case 'foodList':
                await submitFoodList(submittedData);
                break;
            default:
                break;
        }

        dispatch(triggerRefetch());
        dispatch(setModalStatus(false));
        setAddFoodForm(false);
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
            <div className={styles.title_container}>{createType === 'meal' ? <div className={styles.title}>Add food to meal</div> : <div className={styles.title}>Add food to food list</div>}</div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.form_container}>
                            {createType === 'mealListFood' && (
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
                                    <div className={styles.add_label}>Actual Amount</div>
                                    <Field className={styles.add_field} name="existingFoodActualAmount"></Field>
                                </div>
                            )}
                            <div className={styles.create_new_food_container}>
                                <div className={styles.sub_title}>Add by creating a new food</div>

                                <div className={styles.add_label}>Name</div>
                                <Field className={styles.add_field} name="name" type="text" />
                                <ErrorMessage name="name" component="div" className={styles.add_field_error}></ErrorMessage>

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
                                        <ErrorMessage name="calories" component="div" className={styles.add_field_error}></ErrorMessage>

                                        <div className={styles.add_label}>Proteins</div>
                                        <Field className={styles.add_field} name="proteins" />
                                        <ErrorMessage name="proteins" component="div" className={styles.add_field_error}></ErrorMessage>

                                        <div className={styles.add_label}>Carbs</div>
                                        <Field className={styles.add_field} name="carbs" />
                                        <ErrorMessage name="carbs" component="div" className={styles.add_field_error}></ErrorMessage>

                                        <div className={styles.add_label}>Fats</div>
                                        <Field className={styles.add_field} name="fats" />
                                        <ErrorMessage name="fats" component="div" className={styles.add_field_error}></ErrorMessage>
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
                                <ErrorMessage name="givenAmount" component="div" className={styles.add_field_error}></ErrorMessage>
                                {createType === 'mealListFood' && (
                                    <>
                                        <div className={styles.add_label}>Actual Amount</div>
                                        <Field className={styles.add_field} name="actualAmount" />
                                        <ErrorMessage name="actualAmount" component="div" className={styles.add_field_error}></ErrorMessage>
                                    </>
                                )}
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
                                    {errorMsg !== '' ? errorMsg : null}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
