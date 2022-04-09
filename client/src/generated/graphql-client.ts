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
  mealIndex: Scalars['Int'];
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
};

export type Mutation = {
  __typename?: 'Mutation';
  createFood: Food;
  createMeal: User;
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
  getMeals?: Maybe<User>;
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
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetMealsQueryVariables = Exact<{
  getUserId: Scalars['ID'];
  day1: Scalars['Boolean'];
  day2: Scalars['Boolean'];
  day3: Scalars['Boolean'];
  day4: Scalars['Boolean'];
  day5: Scalars['Boolean'];
  day6: Scalars['Boolean'];
  day7: Scalars['Boolean'];
}>;


export type GetMealsQuery = { __typename?: 'Query', getMeals?: { __typename?: 'User', username: string, id: string, day1?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day2?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day3?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day4?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day5?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day6?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }>, day7?: Array<{ __typename?: 'Meal', index: number, id: string, foods: Array<{ __typename?: 'Food', name: string }> }> } | null };


export const GetMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day3"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day4"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day5"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day6"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"day7"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMeals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"day1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}},{"kind":"Argument","name":{"kind":"Name","value":"day2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}},{"kind":"Argument","name":{"kind":"Name","value":"day3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}},{"kind":"Argument","name":{"kind":"Name","value":"day4"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}},{"kind":"Argument","name":{"kind":"Name","value":"day5"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}},{"kind":"Argument","name":{"kind":"Name","value":"day6"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}},{"kind":"Argument","name":{"kind":"Name","value":"day7"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day1"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day1"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day2"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day2"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day3"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day3"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day4"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day4"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day5"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day5"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day6"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day6"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"day7"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"day7"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMealsQuery, GetMealsQueryVariables>;