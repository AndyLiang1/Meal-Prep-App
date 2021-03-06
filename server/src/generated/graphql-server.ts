import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateFoodListInputReal: CreateFoodListInputReal;
  CreateFoodListInput_NewNoIng: CreateFoodListInput_NewNoIng;
  CreateFoodListInput_NewYesIng: CreateFoodListInput_NewYesIng;
  CreateFoodListResponse: ResolverTypeWrapper<CreateFoodListResponse>;
  CreateFoodListType: CreateFoodListType;
  CreateMealListFoodInputReal: CreateMealListFoodInputReal;
  CreateMealListFoodInput_Existing: CreateMealListFoodInput_Existing;
  CreateMealListFoodInput_NewNoIng: CreateMealListFoodInput_NewNoIng;
  CreateMealListFoodInput_NewYesIng: CreateMealListFoodInput_NewYesIng;
  CreateMealListFoodResponse: ResolverTypeWrapper<CreateMealListFoodResponse>;
  CreateMealListFoodType: CreateMealListFoodType;
  DeleteFoodListResponse: ResolverTypeWrapper<DeleteFoodListResponse>;
  DeleteMealListFoodInputReal: DeleteMealListFoodInputReal;
  DeleteMealListFoodResponse: ResolverTypeWrapper<DeleteMealListFoodResponse>;
  EditFoodListInputReal: EditFoodListInputReal;
  EditFoodListInput_NewNoIng: EditFoodListInput_NewNoIng;
  EditFoodListInput_NewYesIng: EditFoodListInput_NewYesIng;
  EditFoodListResponse: ResolverTypeWrapper<EditFoodListResponse>;
  EditFoodListType: EditFoodListType;
  EditMealListFoodInputReal: EditMealListFoodInputReal;
  EditMealListFoodInput_ActualAmount: EditMealListFoodInput_ActualAmount;
  EditMealListFoodInput_NewNoIng: EditMealListFoodInput_NewNoIng;
  EditMealListFoodInput_NewYesIng: EditMealListFoodInput_NewYesIng;
  EditMealListFoodResponse: ResolverTypeWrapper<EditMealListFoodResponse>;
  EditMealListFoodType: EditMealListFoodType;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Food: ResolverTypeWrapper<Food>;
  GetFoodListFoodResponse: ResolverTypeWrapper<GetFoodListFoodResponse>;
  GetFoodListResponse: ResolverTypeWrapper<GetFoodListResponse>;
  GetMealListFoodInputReal: GetMealListFoodInputReal;
  GetMealListFoodResponse: ResolverTypeWrapper<GetMealListFoodResponse>;
  GetMealListMealResponse: ResolverTypeWrapper<GetMealListMealResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginError: ResolverTypeWrapper<LoginError>;
  LoginResult: ResolversTypes['LoginError'] | ResolversTypes['LoginSuccess'];
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>;
  Meal: ResolverTypeWrapper<Meal>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterError: ResolverTypeWrapper<RegisterError>;
  RegisterInput: RegisterInput;
  RegisterResult: ResolversTypes['RegisterError'] | ResolversTypes['RegisterSuccess'];
  RegisterSuccess: ResolverTypeWrapper<RegisterSuccess>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateFoodListInputReal: CreateFoodListInputReal;
  CreateFoodListInput_NewNoIng: CreateFoodListInput_NewNoIng;
  CreateFoodListInput_NewYesIng: CreateFoodListInput_NewYesIng;
  CreateFoodListResponse: CreateFoodListResponse;
  CreateMealListFoodInputReal: CreateMealListFoodInputReal;
  CreateMealListFoodInput_Existing: CreateMealListFoodInput_Existing;
  CreateMealListFoodInput_NewNoIng: CreateMealListFoodInput_NewNoIng;
  CreateMealListFoodInput_NewYesIng: CreateMealListFoodInput_NewYesIng;
  CreateMealListFoodResponse: CreateMealListFoodResponse;
  DeleteFoodListResponse: DeleteFoodListResponse;
  DeleteMealListFoodInputReal: DeleteMealListFoodInputReal;
  DeleteMealListFoodResponse: DeleteMealListFoodResponse;
  EditFoodListInputReal: EditFoodListInputReal;
  EditFoodListInput_NewNoIng: EditFoodListInput_NewNoIng;
  EditFoodListInput_NewYesIng: EditFoodListInput_NewYesIng;
  EditFoodListResponse: EditFoodListResponse;
  EditMealListFoodInputReal: EditMealListFoodInputReal;
  EditMealListFoodInput_ActualAmount: EditMealListFoodInput_ActualAmount;
  EditMealListFoodInput_NewNoIng: EditMealListFoodInput_NewNoIng;
  EditMealListFoodInput_NewYesIng: EditMealListFoodInput_NewYesIng;
  EditMealListFoodResponse: EditMealListFoodResponse;
  Float: Scalars['Float'];
  Food: Food;
  GetFoodListFoodResponse: GetFoodListFoodResponse;
  GetFoodListResponse: GetFoodListResponse;
  GetMealListFoodInputReal: GetMealListFoodInputReal;
  GetMealListFoodResponse: GetMealListFoodResponse;
  GetMealListMealResponse: GetMealListMealResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginError: LoginError;
  LoginResult: ResolversParentTypes['LoginError'] | ResolversParentTypes['LoginSuccess'];
  LoginSuccess: LoginSuccess;
  Meal: Meal;
  Mutation: {};
  Query: {};
  RegisterError: RegisterError;
  RegisterInput: RegisterInput;
  RegisterResult: ResolversParentTypes['RegisterError'] | ResolversParentTypes['RegisterSuccess'];
  RegisterSuccess: RegisterSuccess;
  String: Scalars['String'];
  User: User;
};

export type CreateFoodListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateFoodListResponse'] = ResolversParentTypes['CreateFoodListResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMealListFoodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMealListFoodResponse'] = ResolversParentTypes['CreateMealListFoodResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFoodListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFoodListResponse'] = ResolversParentTypes['DeleteFoodListResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteMealListFoodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMealListFoodResponse'] = ResolversParentTypes['DeleteMealListFoodResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditFoodListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditFoodListResponse'] = ResolversParentTypes['EditFoodListResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditMealListFoodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditMealListFoodResponse'] = ResolversParentTypes['EditMealListFoodResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Food'] = ResolversParentTypes['Food']> = {
  actualAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  calories?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  carbs?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fats?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  givenAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ingredients?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proteins?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFoodListFoodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetFoodListFoodResponse'] = ResolversParentTypes['GetFoodListFoodResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFoodListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetFoodListResponse'] = ResolversParentTypes['GetFoodListResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<Array<ResolversTypes['Food']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetMealListFoodResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetMealListFoodResponse'] = ResolversParentTypes['GetMealListFoodResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetMealListMealResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetMealListMealResponse'] = ResolversParentTypes['GetMealListMealResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<Maybe<Array<ResolversTypes['Meal']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'LoginError' | 'LoginSuccess', ParentType, ContextType>;
};

export type LoginSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginSuccess'] = ResolversParentTypes['LoginSuccess']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MealResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meal'] = ResolversParentTypes['Meal']> = {
  foods?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFoodList?: Resolver<ResolversTypes['CreateFoodListResponse'], ParentType, ContextType, RequireFields<MutationCreateFoodListArgs, 'input'>>;
  createMealListFood?: Resolver<ResolversTypes['CreateMealListFoodResponse'], ParentType, ContextType, RequireFields<MutationCreateMealListFoodArgs, 'input'>>;
  createMealListMeal?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateMealListMealArgs, 'dayIndex'>>;
  deleteFoodList?: Resolver<ResolversTypes['DeleteFoodListResponse'], ParentType, ContextType, RequireFields<MutationDeleteFoodListArgs, 'oldFoodNameToDelete'>>;
  deleteMealListFood?: Resolver<ResolversTypes['DeleteMealListFoodResponse'], ParentType, ContextType, RequireFields<MutationDeleteMealListFoodArgs, 'input'>>;
  deleteMealListMeal?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteMealListMealArgs, 'dayIndex' | 'mealId'>>;
  editFoodList?: Resolver<ResolversTypes['EditFoodListResponse'], ParentType, ContextType, RequireFields<MutationEditFoodListArgs, 'input'>>;
  editMealListFood?: Resolver<ResolversTypes['EditMealListFoodResponse'], ParentType, ContextType, RequireFields<MutationEditMealListFoodArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['RegisterResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  boop?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clearDb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getFoodList?: Resolver<ResolversTypes['GetFoodListResponse'], ParentType, ContextType>;
  getFoodListFood?: Resolver<ResolversTypes['GetFoodListFoodResponse'], ParentType, ContextType, RequireFields<QueryGetFoodListFoodArgs, 'name'>>;
  getMealListFood?: Resolver<Maybe<ResolversTypes['GetMealListFoodResponse']>, ParentType, ContextType, RequireFields<QueryGetMealListFoodArgs, 'input'>>;
  getMealListMeal?: Resolver<ResolversTypes['GetMealListMealResponse'], ParentType, ContextType, RequireFields<QueryGetMealListMealArgs, 'dayIndex'>>;
};

export type RegisterErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterError'] = ResolversParentTypes['RegisterError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']> = {
  __resolveType: TypeResolveFn<'RegisterError' | 'RegisterSuccess', ParentType, ContextType>;
};

export type RegisterSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterSuccess'] = ResolversParentTypes['RegisterSuccess']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  day1?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day2?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day3?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day4?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day5?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day6?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  day7?: Resolver<Array<ResolversTypes['Meal']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  foodList?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateFoodListResponse?: CreateFoodListResponseResolvers<ContextType>;
  CreateMealListFoodResponse?: CreateMealListFoodResponseResolvers<ContextType>;
  DeleteFoodListResponse?: DeleteFoodListResponseResolvers<ContextType>;
  DeleteMealListFoodResponse?: DeleteMealListFoodResponseResolvers<ContextType>;
  EditFoodListResponse?: EditFoodListResponseResolvers<ContextType>;
  EditMealListFoodResponse?: EditMealListFoodResponseResolvers<ContextType>;
  Food?: FoodResolvers<ContextType>;
  GetFoodListFoodResponse?: GetFoodListFoodResponseResolvers<ContextType>;
  GetFoodListResponse?: GetFoodListResponseResolvers<ContextType>;
  GetMealListFoodResponse?: GetMealListFoodResponseResolvers<ContextType>;
  GetMealListMealResponse?: GetMealListMealResponseResolvers<ContextType>;
  LoginError?: LoginErrorResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LoginSuccess?: LoginSuccessResolvers<ContextType>;
  Meal?: MealResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterError?: RegisterErrorResolvers<ContextType>;
  RegisterResult?: RegisterResultResolvers<ContextType>;
  RegisterSuccess?: RegisterSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

