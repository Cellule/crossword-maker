import * as GQLGen from './graphql'
import { GraphQLResolveInfo } from 'graphql';
import { GQLPuzzle, GQLPlacedWord, GQLWord, GraphQLContext } from '../types';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
) => GQLGen.Maybe<TTypes> | Promise<GQLGen.Maybe<TTypes>>;

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
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<GQLGen.Scalars['Boolean']['output']>;
  CreatePuzzleInput: GQLGen.CreatePuzzleInput;
  CreateWordInput: GQLGen.CreateWordInput;
  ID: ResolverTypeWrapper<GQLGen.Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<GQLGen.Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<GQLGen.PageInfo>;
  PlaceWordInput: GQLGen.PlaceWordInput;
  PlacedWord: ResolverTypeWrapper<GQLPlacedWord>;
  Puzzle: ResolverTypeWrapper<GQLPuzzle>;
  PuzzleConnection: ResolverTypeWrapper<Omit<GQLGen.PuzzleConnection, 'edges'> & { edges: Array<ResolversTypes['Puzzle']> }>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<GQLGen.Scalars['String']['output']>;
  Word: ResolverTypeWrapper<GQLWord>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: GQLGen.Scalars['Boolean']['output'];
  CreatePuzzleInput: GQLGen.CreatePuzzleInput;
  CreateWordInput: GQLGen.CreateWordInput;
  ID: GQLGen.Scalars['ID']['output'];
  Int: GQLGen.Scalars['Int']['output'];
  Mutation: {};
  PageInfo: GQLGen.PageInfo;
  PlaceWordInput: GQLGen.PlaceWordInput;
  PlacedWord: GQLPlacedWord;
  Puzzle: GQLPuzzle;
  PuzzleConnection: Omit<GQLGen.PuzzleConnection, 'edges'> & { edges: Array<ResolversParentTypes['Puzzle']> };
  Query: {};
  String: GQLGen.Scalars['String']['output'];
  Word: GQLWord;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPuzzle?: Resolver<ResolversTypes['Puzzle'], ParentType, ContextType, RequireFields<GQLGen.MutationCreatePuzzleArgs, 'input'>>;
  createWord?: Resolver<ResolversTypes['Word'], ParentType, ContextType, RequireFields<GQLGen.MutationCreateWordArgs, 'input'>>;
  deletePuzzle?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLGen.MutationDeletePuzzleArgs, 'id'>>;
  placeWord?: Resolver<ResolversTypes['PlacedWord'], ParentType, ContextType, RequireFields<GQLGen.MutationPlaceWordArgs, 'input' | 'puzzleId'>>;
  removeWord?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLGen.MutationRemoveWordArgs, 'placedWordId' | 'puzzleId'>>;
}>;

export type PageInfoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlacedWordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PlacedWord'] = ResolversParentTypes['PlacedWord']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isHorizontal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startX?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startY?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  word?: Resolver<ResolversTypes['Word'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PuzzleResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Puzzle'] = ResolversParentTypes['Puzzle']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  words?: Resolver<Array<ResolversTypes['PlacedWord']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PuzzleConnectionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PuzzleConnection'] = ResolversParentTypes['PuzzleConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['Puzzle']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  puzzle?: Resolver<GQLGen.Maybe<ResolversTypes['Puzzle']>, ParentType, ContextType, RequireFields<GQLGen.QueryPuzzleArgs, 'id'>>;
  puzzles?: Resolver<ResolversTypes['PuzzleConnection'], ParentType, ContextType, RequireFields<GQLGen.QueryPuzzlesArgs, 'first'>>;
  word?: Resolver<GQLGen.Maybe<ResolversTypes['Word']>, ParentType, ContextType, RequireFields<GQLGen.QueryWordArgs, 'id'>>;
  words?: Resolver<Array<ResolversTypes['Word']>, ParentType, ContextType>;
}>;

export type WordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = ResolversObject<{
  descriptions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  length?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PlacedWord?: PlacedWordResolvers<ContextType>;
  Puzzle?: PuzzleResolvers<ContextType>;
  PuzzleConnection?: PuzzleConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
}>;

