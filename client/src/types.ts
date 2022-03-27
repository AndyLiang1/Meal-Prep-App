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

export type Day = {
  __typename?: 'Day';
  meals?: Maybe<Array<Maybe<Meal>>>;
  name: Scalars['String'];
};

export type Food = {
  __typename?: 'Food';
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  fats: Scalars['Float'];
  ingredients?: Maybe<Array<Maybe<Food>>>;
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
  foods?: Maybe<Array<Maybe<Food>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResult;
  register: RegisterResult;
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
  getUser: User;
};


export type QueryGetUserArgs = {
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
  days: Array<Day>;
  email: Scalars['String'];
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


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterError', message: string } | { __typename?: 'RegisterSuccess', user: { __typename?: 'User', id: string, username: string, email: string, password: string, accessToken: string, days: Array<{ __typename?: 'Day', meals?: Array<{ __typename?: 'Meal', foods?: Array<{ __typename?: 'Food', calories: number } | null> | null } | null> | null }> } } };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', username: string, id: string, days: Array<{ __typename?: 'Day', name: string, meals?: Array<{ __typename?: 'Meal', foods?: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number, ingredients?: Array<{ __typename?: 'Food', name: string, calories: number, proteins: number, carbs: number, fats: number } | null> | null } | null> | null } | null> | null }> } };
