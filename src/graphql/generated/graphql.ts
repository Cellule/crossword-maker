/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Input for creating a new puzzle */
export type CreatePuzzleInput = {
  name: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

/** Input for creating a new word */
export type CreateWordInput = {
  descriptions: Array<Scalars['String']['input']>;
  word: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new empty puzzle */
  createPuzzle: Puzzle;
  /** Add a new word to the database */
  createWord: Word;
  /** Delete a puzzle */
  deletePuzzle: Scalars['Boolean']['output'];
  /** Place a word in the puzzle */
  placeWord: PlacedWord;
  /** Remove a word from the puzzle */
  removeWord: Scalars['Boolean']['output'];
};


export type MutationCreatePuzzleArgs = {
  input: CreatePuzzleInput;
};


export type MutationCreateWordArgs = {
  input: CreateWordInput;
};


export type MutationDeletePuzzleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPlaceWordArgs = {
  input: PlaceWordInput;
  puzzleId: Scalars['ID']['input'];
};


export type MutationRemoveWordArgs = {
  placedWordId: Scalars['ID']['input'];
  puzzleId: Scalars['ID']['input'];
};

/** Information about pagination */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

/** Input for placing a word in the puzzle */
export type PlaceWordInput = {
  isHorizontal: Scalars['Boolean']['input'];
  startX: Scalars['Int']['input'];
  startY: Scalars['Int']['input'];
  wordId: Scalars['ID']['input'];
};

/** A placed word in the puzzle grid */
export type PlacedWord = {
  __typename?: 'PlacedWord';
  id: Scalars['ID']['output'];
  isHorizontal: Scalars['Boolean']['output'];
  startX: Scalars['Int']['output'];
  startY: Scalars['Int']['output'];
  word: Word;
};

/** The crossword puzzle grid */
export type Puzzle = {
  __typename?: 'Puzzle';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  words: Array<PlacedWord>;
};

/** A connection to a list of puzzles */
export type PuzzleConnection = {
  __typename?: 'PuzzleConnection';
  edges: Array<Puzzle>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific puzzle by ID */
  puzzle?: Maybe<Puzzle>;
  /** Get all puzzles */
  puzzles: PuzzleConnection;
  /** Get a specific word by ID */
  word?: Maybe<Word>;
  /** Get all available words */
  words: Array<Word>;
};


export type QueryPuzzleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPuzzlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryWordArgs = {
  id: Scalars['ID']['input'];
};

/** A word that can be used in the crossword puzzle */
export type Word = {
  __typename?: 'Word';
  descriptions: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  length: Scalars['Int']['output'];
  word: Scalars['String']['output'];
};

export type CreatePuzzleMutationVariables = Exact<{
  input: CreatePuzzleInput;
}>;


export type CreatePuzzleMutation = { __typename?: 'Mutation', createPuzzle: (
    { __typename?: 'Puzzle', id: string }
    & { ' $fragmentRefs'?: { 'PuzzleCard_PuzzleFragment': PuzzleCard_PuzzleFragment } }
  ) };

export type NewPuzzleFragment = (
  { __typename?: 'Puzzle', id: string }
  & { ' $fragmentRefs'?: { 'PuzzleCard_PuzzleFragment': PuzzleCard_PuzzleFragment } }
) & { ' $fragmentName'?: 'NewPuzzleFragment' };

export type GetPuzzlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPuzzlesQuery = { __typename?: 'Query', puzzles: { __typename?: 'PuzzleConnection', edges: Array<(
      { __typename?: 'Puzzle', id: string }
      & { ' $fragmentRefs'?: { 'PuzzleCard_PuzzleFragment': PuzzleCard_PuzzleFragment } }
    )>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } };

export type PuzzleCard_PuzzleFragment = { __typename?: 'Puzzle', id: string, name: string, size: number, createdAt: string, updatedAt: string } & { ' $fragmentName'?: 'PuzzleCard_PuzzleFragment' };

export type DeletePuzzleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePuzzleMutation = { __typename?: 'Mutation', deletePuzzle: boolean };

export type GetPuzzleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPuzzleQuery = { __typename?: 'Query', puzzle?: (
    { __typename?: 'Puzzle', id: string, name: string }
    & { ' $fragmentRefs'?: { 'PuzzleGrid_PuzzleFragment': PuzzleGrid_PuzzleFragment;'WordList_PuzzleFragment': WordList_PuzzleFragment } }
  ) | null };

export type PuzzleGrid_PuzzleFragment = { __typename?: 'Puzzle', id: string, size: number, words: Array<(
    { __typename?: 'PlacedWord' }
    & { ' $fragmentRefs'?: { 'PuzzleGrid_PlacedWordFragment': PuzzleGrid_PlacedWordFragment } }
  )> } & { ' $fragmentName'?: 'PuzzleGrid_PuzzleFragment' };

export type PuzzleGrid_PlacedWordFragment = { __typename?: 'PlacedWord', id: string, startX: number, startY: number, isHorizontal: boolean, word: { __typename?: 'Word', id: string, word: string, descriptions: Array<string>, length: number } } & { ' $fragmentName'?: 'PuzzleGrid_PlacedWordFragment' };

export type PlaceWordMutationVariables = Exact<{
  puzzleId: Scalars['ID']['input'];
  input: PlaceWordInput;
}>;


export type PlaceWordMutation = { __typename?: 'Mutation', placeWord: (
    { __typename?: 'PlacedWord' }
    & { ' $fragmentRefs'?: { 'PuzzleGrid_PlacedWordFragment': PuzzleGrid_PlacedWordFragment } }
  ) };

export type WordList_PuzzleFragment = { __typename?: 'Puzzle', id: string, words: Array<{ __typename?: 'PlacedWord', id: string, startX: number, startY: number, isHorizontal: boolean, word: { __typename?: 'Word', word: string } }> } & { ' $fragmentName'?: 'WordList_PuzzleFragment' };

export type GetWordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWordsQuery = { __typename?: 'Query', words: Array<{ __typename?: 'Word', id: string, word: string, descriptions: Array<string>, length: number }> };

export type CreateWordMutationVariables = Exact<{
  input: CreateWordInput;
}>;


export type CreateWordMutation = { __typename?: 'Mutation', createWord: { __typename?: 'Word', id: string, word: string, descriptions: Array<string>, length: number } };

export type NewWordFragment = { __typename?: 'Word', id: string, word: string, descriptions: Array<string>, length: number } & { ' $fragmentName'?: 'NewWordFragment' };

export const PuzzleCard_PuzzleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleCard_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PuzzleCard_PuzzleFragment, unknown>;
export const NewPuzzleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewPuzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleCard_puzzle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleCard_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<NewPuzzleFragment, unknown>;
export const PuzzleGrid_PlacedWordFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_placedWord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlacedWord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<PuzzleGrid_PlacedWordFragment, unknown>;
export const PuzzleGrid_PuzzleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleGrid_placedWord"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_placedWord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlacedWord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<PuzzleGrid_PuzzleFragment, unknown>;
export const WordList_PuzzleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordList_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"word"}}]}}]}}]}}]} as unknown as DocumentNode<WordList_PuzzleFragment, unknown>;
export const NewWordFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewWord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Word"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]} as unknown as DocumentNode<NewWordFragment, unknown>;
export const CreatePuzzleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePuzzle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePuzzleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPuzzle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleCard_puzzle"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleCard_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreatePuzzleMutation, CreatePuzzleMutationVariables>;
export const GetPuzzlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPuzzles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"puzzles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleCard_puzzle"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"nonreactive"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleCard_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPuzzlesQuery, GetPuzzlesQueryVariables>;
export const DeletePuzzleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePuzzle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePuzzle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePuzzleMutation, DeletePuzzleMutationVariables>;
export const GetPuzzleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPuzzle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"puzzle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleGrid_puzzle"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WordList_puzzle"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_placedWord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlacedWord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleGrid_placedWord"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordList_puzzle"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Puzzle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"word"}}]}}]}}]}}]} as unknown as DocumentNode<GetPuzzleQuery, GetPuzzleQueryVariables>;
export const PlaceWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaceWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"puzzleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceWordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"puzzleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"puzzleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PuzzleGrid_placedWord"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PuzzleGrid_placedWord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlacedWord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startX"}},{"kind":"Field","name":{"kind":"Name","value":"startY"}},{"kind":"Field","name":{"kind":"Name","value":"isHorizontal"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<PlaceWordMutation, PlaceWordMutationVariables>;
export const GetWordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<GetWordsQuery, GetWordsQueryVariables>;
export const CreateWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"descriptions"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]} as unknown as DocumentNode<CreateWordMutation, CreateWordMutationVariables>;