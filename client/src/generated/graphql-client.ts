import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateFoodListInputReal = {
  createType: CreateFoodListType;
  inputNewNoIng?: InputMaybe<CreateFoodListInput_NewNoIng>;
  inputNewYesIng?: InputMaybe<CreateFoodListInput_NewYesIng>;
};

export type CreateFoodListInput_NewNoIng = {
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  givenAmount: Scalars['Float'];
  name: Scalars['String'];
  proteins: Scalars['Float'];
};

export type CreateFoodListInput_NewYesIng = {
  givenAmount: Scalars['Float'];
  ingredientActualAmounts: Array<Scalars['Float']>;
  ingredientNames: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateFoodListResponse = {
  __typename?: 'CreateFoodListResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export enum CreateFoodListType {
  NewNoIng = 'NEW_NO_ING',
  NewYesIng = 'NEW_YES_ING'
}

export type CreateMealListFoodInputReal = {
  createType: CreateMealListFoodType;
  inputExisting?: InputMaybe<CreateMealListFoodInput_Existing>;
  inputNewNoIng?: InputMaybe<CreateMealListFoodInput_NewNoIng>;
  inputNewYesIng?: InputMaybe<CreateMealListFoodInput_NewYesIng>;
};

export type CreateMealListFoodInput_Existing = {
  actualAmount: Scalars['Float'];
  dayIndex: Scalars['Float'];
  existingFoodName: Scalars['String'];
  mealId: Scalars['String'];
};

export type CreateMealListFoodInput_NewNoIng = {
  actualAmount: Scalars['Float'];
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  dayIndex: Scalars['Float'];
  fats: Scalars['Float'];
  givenAmount: Scalars['Float'];
  mealId: Scalars['String'];
  name: Scalars['String'];
  proteins: Scalars['Float'];
};

export type CreateMealListFoodInput_NewYesIng = {
  actualAmount: Scalars['Float'];
  dayIndex: Scalars['Float'];
  givenAmount: Scalars['Float'];
  ingredientActualAmounts: Array<Scalars['Float']>;
  ingredientNames: Array<Scalars['String']>;
  mealId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateMealListFoodResponse = {
  __typename?: 'CreateMealListFoodResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export enum CreateMealListFoodType {
  Existing = 'EXISTING',
  NewNoIng = 'NEW_NO_ING',
  NewYesIng = 'NEW_YES_ING'
}

export type DeleteFoodListResponse = {
  __typename?: 'DeleteFoodListResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Scalars['String']>;
};

export type DeleteMealListFoodInputReal = {
  dayIndex: Scalars['Float'];
  foodIndex: Scalars['Float'];
  mealId: Scalars['String'];
};

export type DeleteMealListFoodResponse = {
  __typename?: 'DeleteMealListFoodResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Scalars['String']>;
};

export type EditFoodListInputReal = {
  editType: EditFoodListType;
  inputNewNoIng?: InputMaybe<EditFoodListInput_NewNoIng>;
  inputNewYesIng?: InputMaybe<EditFoodListInput_NewYesIng>;
};

export type EditFoodListInput_NewNoIng = {
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  givenAmount: Scalars['Float'];
  name: Scalars['String'];
  oldFoodName: Scalars['String'];
  proteins: Scalars['Float'];
};

export type EditFoodListInput_NewYesIng = {
  givenAmount: Scalars['Float'];
  ingredientActualAmounts: Array<Scalars['Float']>;
  ingredientNames: Array<Scalars['String']>;
  name: Scalars['String'];
  oldFoodName: Scalars['String'];
};

export type EditFoodListResponse = {
  __typename?: 'EditFoodListResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export enum EditFoodListType {
  NewNoIng = 'NEW_NO_ING',
  NewYesIng = 'NEW_YES_ING'
}

export type EditMealListFoodInputReal = {
  editType: EditMealListFoodType;
  inputActualAmount?: InputMaybe<EditMealListFoodInput_ActualAmount>;
  inputNewNoIng?: InputMaybe<EditMealListFoodInput_NewNoIng>;
  inputNewYesIng?: InputMaybe<EditMealListFoodInput_NewYesIng>;
};

export type EditMealListFoodInput_ActualAmount = {
  dayIndex: Scalars['Float'];
  foodIndex: Scalars['Float'];
  mealId: Scalars['String'];
  newActualAmount: Scalars['Float'];
};

export type EditMealListFoodInput_NewNoIng = {
  actualAmount: Scalars['Float'];
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  dayIndex: Scalars['Float'];
  fats: Scalars['Float'];
  foodIndex: Scalars['Float'];
  givenAmount: Scalars['Float'];
  mealId: Scalars['String'];
  name: Scalars['String'];
  proteins: Scalars['Float'];
};

export type EditMealListFoodInput_NewYesIng = {
  actualAmount: Scalars['Float'];
  dayIndex: Scalars['Float'];
  foodIndex: Scalars['Float'];
  givenAmount: Scalars['Float'];
  ingredientActualAmounts: Array<Scalars['Float']>;
  ingredientNames: Array<Scalars['String']>;
  mealId: Scalars['String'];
  name: Scalars['String'];
};

export type EditMealListFoodResponse = {
  __typename?: 'EditMealListFoodResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export enum EditMealListFoodType {
  ActualAmount = 'ACTUAL_AMOUNT',
  NewNoIng = 'NEW_NO_ING',
  NewYesIng = 'NEW_YES_ING'
}

export type Food = {
  __typename?: 'Food';
  actualAmount?: Maybe<Scalars['Float']>;
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  givenAmount: Scalars['Float'];
  ingredients: Array<Food>;
  name: Scalars['String'];
  proteins: Scalars['Float'];
};

export type GetFoodListFoodResponse = {
  __typename?: 'GetFoodListFoodResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export type GetFoodListResponse = {
  __typename?: 'GetFoodListResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Food>>;
};

export type GetMealListFoodInputReal = {
  dayIndex: Scalars['Float'];
  foodIndex: Scalars['Float'];
  mealId: Scalars['String'];
};

export type GetMealListFoodResponse = {
  __typename?: 'GetMealListFoodResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Food>;
};

export type GetMealListMealResponse = {
  __typename?: 'GetMealListMealResponse';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Meal>>;
};

export type LoginError = {
  __typename?: 'LoginError';
  message: Scalars['String'];
};

export type LoginResult = LoginError | LoginSuccess;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  user: User;
};

export type Meal = {
  __typename?: 'Meal';
  foods: Array<Food>;
  id: Scalars['ID'];
  index: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFoodList: CreateFoodListResponse;
  createMealListFood: CreateMealListFoodResponse;
  createMealListMeal: Scalars['String'];
  deleteFoodList: DeleteFoodListResponse;
  deleteMealListFood: DeleteMealListFoodResponse;
  deleteMealListMeal: Scalars['ID'];
  editFoodList: EditFoodListResponse;
  editMealListFood: EditMealListFoodResponse;
  login: LoginResult;
  register: RegisterResult;
};


export type MutationCreateFoodListArgs = {
  input: CreateFoodListInputReal;
};


export type MutationCreateMealListFoodArgs = {
  input: CreateMealListFoodInputReal;
};


export type MutationCreateMealListMealArgs = {
  dayIndex: Scalars['Float'];
};


export type MutationDeleteFoodListArgs = {
  oldFoodNameToDelete: Scalars['String'];
};


export type MutationDeleteMealListFoodArgs = {
  input: DeleteMealListFoodInputReal;
};


export type MutationDeleteMealListMealArgs = {
  dayIndex: Scalars['Float'];
  mealId: Scalars['String'];
};


export type MutationEditFoodListArgs = {
  input: EditFoodListInputReal;
};


export type MutationEditMealListFoodArgs = {
  input: EditMealListFoodInputReal;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  boop: Scalars['String'];
  clearDb?: Maybe<Scalars['String']>;
  getFoodList: GetFoodListResponse;
  getFoodListFood: GetFoodListFoodResponse;
  getMealListFood?: Maybe<GetMealListFoodResponse>;
  getMealListMeal: GetMealListMealResponse;
};


export type QueryGetFoodListFoodArgs = {
  name: Scalars['String'];
};


export type QueryGetMealListFoodArgs = {
  input: GetMealListFoodInputReal;
};


export type QueryGetMealListMealArgs = {
  dayIndex: Scalars['Float'];
};

export type RegisterError = {
  __typename?: 'RegisterError';
  message: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResult = RegisterError | RegisterSuccess;

export type RegisterSuccess = {
  __typename?: 'RegisterSuccess';
  user: User;
};

export type User = {
  __typename?: 'User';
  accessToken: Scalars['String'];
  day1: Array<Meal>;
  day2: Array<Meal>;
  day3: Array<Meal>;
  day4: Array<Meal>;
  day5: Array<Meal>;
  day6: Array<Meal>;
  day7: Array<Meal>;
  email: Scalars['String'];
  foodList: Array<Food>;
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginError', message: string } | { __typename?: 'LoginSuccess', user: { __typename?: 'User', id: string, username: string, accessToken: string } } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterError', message: string } | { __typename?: 'RegisterSuccess', user: { __typename?: 'User', id: string, username: string, email: string, password: string, accessToken: string, day1: Array<{ __typename?: 'Meal', foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number }> }> } } };

export type CreateFoodListMutationVariables = Exact<{
  input: CreateFoodListInputReal;
}>;


export type CreateFoodListMutation = { __typename?: 'Mutation', createFoodList: { __typename?: 'CreateFoodListResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> } | null } };

export type CreateMealListFoodMutationVariables = Exact<{
  input: CreateMealListFoodInputReal;
}>;


export type CreateMealListFoodMutation = { __typename?: 'Mutation', createMealListFood: { __typename?: 'CreateMealListFoodResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string }> } | null } };

export type DeleteFoodListMutationVariables = Exact<{
  oldFoodNameToDelete: Scalars['String'];
}>;


export type DeleteFoodListMutation = { __typename?: 'Mutation', deleteFoodList: { __typename?: 'DeleteFoodListResponse', ok: boolean, result?: string | null, message?: string | null } };

export type DeleteMealListFoodMutationVariables = Exact<{
  input: DeleteMealListFoodInputReal;
}>;


export type DeleteMealListFoodMutation = { __typename?: 'Mutation', deleteMealListFood: { __typename?: 'DeleteMealListFoodResponse', ok: boolean, result?: string | null, message?: string | null } };

export type DeleteMealListMealMutationVariables = Exact<{
  dayIndex: Scalars['Float'];
  mealId: Scalars['String'];
}>;


export type DeleteMealListMealMutation = { __typename?: 'Mutation', deleteMealListMeal: string };

export type EditFoodListMutationVariables = Exact<{
  input: EditFoodListInputReal;
}>;


export type EditFoodListMutation = { __typename?: 'Mutation', editFoodList: { __typename?: 'EditFoodListResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> } | null } };

export type EditMealListFoodMutationVariables = Exact<{
  input: EditMealListFoodInputReal;
}>;


export type EditMealListFoodMutation = { __typename?: 'Mutation', editMealListFood: { __typename?: 'EditMealListFoodResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string }> }> } | null } };

export type GetFoodListFoodQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetFoodListFoodQuery = { __typename?: 'Query', getFoodListFood: { __typename?: 'GetFoodListFoodResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string }> }> } | null } };

export type GetMealListFoodQueryVariables = Exact<{
  input: GetMealListFoodInputReal;
}>;


export type GetMealListFoodQuery = { __typename?: 'Query', getMealListFood?: { __typename?: 'GetMealListFoodResponse', ok: boolean, message?: string | null, result?: { __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null, ingredients: Array<{ __typename?: 'Food', name: string }> }> } | null } | null };

export type CreateMealListMealMutationVariables = Exact<{
  dayIndex: Scalars['Float'];
}>;


export type CreateMealListMealMutation = { __typename?: 'Mutation', createMealListMeal: string };

export type GetFoodListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoodListQuery = { __typename?: 'Query', getFoodList: { __typename?: 'GetFoodListResponse', ok: boolean, message?: string | null, result?: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, ingredients: Array<{ __typename?: 'Food', name: string }> }> | null } };

export type GetMealListMealsQueryVariables = Exact<{
  dayIndex: Scalars['Float'];
}>;


export type GetMealListMealsQuery = { __typename?: 'Query', getMealListMeal: { __typename?: 'GetMealListMealResponse', ok: boolean, message?: string | null, result?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, givenAmount: number, actualAmount?: number | null }> }> | null } };


export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"day1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const CreateFoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFoodList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFoodListInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFoodList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateFoodListMutation, CreateFoodListMutationVariables>;
export const CreateMealListFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMealListFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMealListFoodInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMealListFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateMealListFoodMutation, CreateMealListFoodMutationVariables>;
export const DeleteFoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFoodList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldFoodNameToDelete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFoodList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oldFoodNameToDelete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldFoodNameToDelete"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteFoodListMutation, DeleteFoodListMutationVariables>;
export const DeleteMealListFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMealListFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMealListFoodInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMealListFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMealListFoodMutation, DeleteMealListFoodMutationVariables>;
export const DeleteMealListMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMealListMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMealListMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}}}]}]}}]} as unknown as DocumentNode<DeleteMealListMealMutation, DeleteMealListMealMutationVariables>;
export const EditFoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditFoodList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditFoodListInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editFoodList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<EditFoodListMutation, EditFoodListMutationVariables>;
export const EditMealListFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditMealListFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditMealListFoodInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editMealListFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<EditMealListFoodMutation, EditMealListFoodMutationVariables>;
export const GetFoodListFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFoodListFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFoodListFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetFoodListFoodQuery, GetFoodListFoodQueryVariables>;
export const GetMealListFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealListFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetMealListFoodInputReal"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMealListFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetMealListFoodQuery, GetMealListFoodQueryVariables>;
export const CreateMealListMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMealListMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMealListMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}}]}]}}]} as unknown as DocumentNode<CreateMealListMealMutation, CreateMealListMealMutationVariables>;
export const GetFoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFoodList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFoodList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetFoodListQuery, GetFoodListQueryVariables>;
export const GetMealListMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMealListMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMealListMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"givenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"actualAmount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<GetMealListMealsQuery, GetMealListMealsQueryVariables>;