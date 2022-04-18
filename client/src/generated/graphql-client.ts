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

export type CreateFoodInput = {
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  ingredientNames: Array<Scalars['String']>;
  mealId: Scalars['ID'];
  name: Scalars['String'];
  proteins: Scalars['Float'];
  userId: Scalars['ID'];
};

export type Food = {
  __typename?: 'Food';
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  ingredients: Array<Food>;
  name: Scalars['String'];
  proteins: Scalars['Float'];
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
  createFood: Food;
  createMeal: Scalars['ID'];
  deleteFood: Scalars['ID'];
  deleteMeal: Scalars['ID'];
  login: LoginResult;
  register: RegisterResult;
};


export type MutationCreateFoodArgs = {
  input: CreateFoodInput;
};


export type MutationCreateMealArgs = {
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
  dayIndex: Scalars['Int'];
  userId: Scalars['ID'];
};


export type MutationDeleteFoodArgs = {
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
  dayIndex: Scalars['Int'];
  foodName: Scalars['String'];
  mealId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeleteMealArgs = {
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
  dayIndex: Scalars['Int'];
  mealId: Scalars['ID'];
  userId: Scalars['ID'];
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
  getFoodList: Array<Food>;
  getMeals: User;
};


export type QueryGetFoodListArgs = {
  id: Scalars['ID'];
};


export type QueryGetMealsArgs = {
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
  id: Scalars['ID'];
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

export type GetFoodListQueryVariables = Exact<{
  getFoodListId: Scalars['ID'];
}>;


export type GetFoodListQuery = { __typename?: 'Query', getFoodList: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> };

export type DeleteMealMutationVariables = Exact<{
  userId: Scalars['ID'];
  dayIndex: Scalars['Int'];
  mealId: Scalars['ID'];
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
}>;


export type DeleteMealMutation = { __typename?: 'Mutation', deleteMeal: string };

export type DeleteFoodMutationVariables = Exact<{
  userId: Scalars['ID'];
  dayIndex: Scalars['Int'];
  mealId: Scalars['ID'];
  foodName: Scalars['String'];
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
}>;


export type DeleteFoodMutation = { __typename?: 'Mutation', deleteFood: string };

export type CreateMealMutationVariables = Exact<{
  userId: Scalars['ID'];
  dayIndex: Scalars['Int'];
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
}>;


export type CreateMealMutation = { __typename?: 'Mutation', createMeal: string };

export type GetMealsQueryVariables = Exact<{
  userId: Scalars['ID'];
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
}>;


export type GetMealsQuery = { __typename?: 'Query', getMeals: { __typename?: 'User', username: string, id: string, day1?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day2?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day3?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day4?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day5?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day6?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, day7?: Array<{ __typename?: 'Meal', name: string, index: number, id: string, foods: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> }>, foodList: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number }> }> } };


export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"day1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetFoodListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFoodList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getFoodListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFoodList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getFoodListId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}}]} as unknown as DocumentNode<GetFoodListQuery, GetFoodListQueryVariables>;
export const DeleteMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day3"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day4"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day5"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day6"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day7"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}}},{"kind":"Argument","name":{"kind":"Name","value":"day1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}},{"kind":"Argument","name":{"kind":"Name","value":"day2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}},{"kind":"Argument","name":{"kind":"Name","value":"day3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}},{"kind":"Argument","name":{"kind":"Name","value":"day4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}},{"kind":"Argument","name":{"kind":"Name","value":"day5"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}},{"kind":"Argument","name":{"kind":"Name","value":"day6"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}},{"kind":"Argument","name":{"kind":"Name","value":"day7"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}]}]}}]} as unknown as DocumentNode<DeleteMealMutation, DeleteMealMutationVariables>;
export const DeleteFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"foodName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day3"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day4"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day5"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day6"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day7"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealId"}}},{"kind":"Argument","name":{"kind":"Name","value":"foodName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"foodName"}}},{"kind":"Argument","name":{"kind":"Name","value":"day1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}},{"kind":"Argument","name":{"kind":"Name","value":"day2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}},{"kind":"Argument","name":{"kind":"Name","value":"day3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}},{"kind":"Argument","name":{"kind":"Name","value":"day4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}},{"kind":"Argument","name":{"kind":"Name","value":"day5"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}},{"kind":"Argument","name":{"kind":"Name","value":"day6"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}},{"kind":"Argument","name":{"kind":"Name","value":"day7"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}]}]}}]} as unknown as DocumentNode<DeleteFoodMutation, DeleteFoodMutationVariables>;
export const CreateMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day3"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day4"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day5"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day6"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day7"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dayIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"day1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}},{"kind":"Argument","name":{"kind":"Name","value":"day2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}},{"kind":"Argument","name":{"kind":"Name","value":"day3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}},{"kind":"Argument","name":{"kind":"Name","value":"day4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}},{"kind":"Argument","name":{"kind":"Name","value":"day5"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}},{"kind":"Argument","name":{"kind":"Name","value":"day6"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}},{"kind":"Argument","name":{"kind":"Name","value":"day7"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}]}]}}]} as unknown as DocumentNode<CreateMealMutation, CreateMealMutationVariables>;
export const GetMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day3"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day4"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day5"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day6"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day7"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMeals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"day1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}},{"kind":"Argument","name":{"kind":"Name","value":"day2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}},{"kind":"Argument","name":{"kind":"Name","value":"day3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}},{"kind":"Argument","name":{"kind":"Name","value":"day4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}},{"kind":"Argument","name":{"kind":"Name","value":"day5"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}},{"kind":"Argument","name":{"kind":"Name","value":"day6"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}},{"kind":"Argument","name":{"kind":"Name","value":"day7"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day1"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day2"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day3"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day4"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day5"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day6"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day7"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"foodList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"proteins"}},{"kind":"Field","name":{"kind":"Name","value":"carbs"}},{"kind":"Field","name":{"kind":"Name","value":"fats"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMealsQuery, GetMealsQueryVariables>;