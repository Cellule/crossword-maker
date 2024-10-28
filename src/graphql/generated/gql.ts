/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation CreatePuzzle($input: CreatePuzzleInput!) {\n    createPuzzle(input: $input) {\n      id\n      ...PuzzleCard_puzzle\n    }\n  }\n": types.CreatePuzzleDocument,
    "\n                fragment NewPuzzle on Puzzle {\n                  id\n                  ...PuzzleCard_puzzle\n                }\n              ": types.NewPuzzleFragmentDoc,
    "\n  query GetPuzzles {\n    puzzles(first: 5) {\n      edges {\n        id\n        ...PuzzleCard_puzzle @nonreactive\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n": types.GetPuzzlesDocument,
    "\n  fragment PuzzleCard_puzzle on Puzzle {\n    id\n    name\n    size\n    createdAt\n    updatedAt\n  }\n": types.PuzzleCard_PuzzleFragmentDoc,
    "\n  mutation DeletePuzzle($id: ID!) {\n    deletePuzzle(id: $id)\n  }\n": types.DeletePuzzleDocument,
    "\n  query GetPuzzle($id: ID!) {\n    puzzle(id: $id) {\n      id\n      name\n      ...PuzzleGrid_puzzle\n      ...WordList_puzzle\n    }\n  }\n": types.GetPuzzleDocument,
    "\n  fragment PuzzleGrid_puzzle on Puzzle {\n    id\n    size\n      words {\n       ...PuzzleGrid_placedWord\n      }\n  }\n": types.PuzzleGrid_PuzzleFragmentDoc,
    "\n  fragment PuzzleGrid_placedWord on PlacedWord {\n    id\n    startX\n      startY\n      isHorizontal\n        word {\n          id\n        word\n        descriptions\n        length\n        }\n  }\n": types.PuzzleGrid_PlacedWordFragmentDoc,
    "\n  mutation PlaceWord($puzzleId: ID!, $input: PlaceWordInput!) {\n    placeWord(puzzleId: $puzzleId, input: $input) {\n      ...PuzzleGrid_placedWord\n    }\n  }\n": types.PlaceWordDocument,
    "\n  fragment WordList_puzzle on Puzzle {\n    id\n    words {\n      id\n      startX\n      startY\n      isHorizontal\n      word {\n        word\n      }\n    }\n  }\n": types.WordList_PuzzleFragmentDoc,
    "\n  query GetWords {\n    words {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n": types.GetWordsDocument,
    "\n  mutation CreateWord($input: CreateWordInput!) {\n    createWord(input: $input) {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n": types.CreateWordDocument,
    "\n                fragment NewWord on Word {\n                  id\n                  word\n                  descriptions\n                  length\n                }\n              ": types.NewWordFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePuzzle($input: CreatePuzzleInput!) {\n    createPuzzle(input: $input) {\n      id\n      ...PuzzleCard_puzzle\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePuzzle($input: CreatePuzzleInput!) {\n    createPuzzle(input: $input) {\n      id\n      ...PuzzleCard_puzzle\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                fragment NewPuzzle on Puzzle {\n                  id\n                  ...PuzzleCard_puzzle\n                }\n              "): (typeof documents)["\n                fragment NewPuzzle on Puzzle {\n                  id\n                  ...PuzzleCard_puzzle\n                }\n              "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPuzzles {\n    puzzles(first: 5) {\n      edges {\n        id\n        ...PuzzleCard_puzzle @nonreactive\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPuzzles {\n    puzzles(first: 5) {\n      edges {\n        id\n        ...PuzzleCard_puzzle @nonreactive\n      }\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PuzzleCard_puzzle on Puzzle {\n    id\n    name\n    size\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment PuzzleCard_puzzle on Puzzle {\n    id\n    name\n    size\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePuzzle($id: ID!) {\n    deletePuzzle(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeletePuzzle($id: ID!) {\n    deletePuzzle(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPuzzle($id: ID!) {\n    puzzle(id: $id) {\n      id\n      name\n      ...PuzzleGrid_puzzle\n      ...WordList_puzzle\n    }\n  }\n"): (typeof documents)["\n  query GetPuzzle($id: ID!) {\n    puzzle(id: $id) {\n      id\n      name\n      ...PuzzleGrid_puzzle\n      ...WordList_puzzle\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PuzzleGrid_puzzle on Puzzle {\n    id\n    size\n      words {\n       ...PuzzleGrid_placedWord\n      }\n  }\n"): (typeof documents)["\n  fragment PuzzleGrid_puzzle on Puzzle {\n    id\n    size\n      words {\n       ...PuzzleGrid_placedWord\n      }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PuzzleGrid_placedWord on PlacedWord {\n    id\n    startX\n      startY\n      isHorizontal\n        word {\n          id\n        word\n        descriptions\n        length\n        }\n  }\n"): (typeof documents)["\n  fragment PuzzleGrid_placedWord on PlacedWord {\n    id\n    startX\n      startY\n      isHorizontal\n        word {\n          id\n        word\n        descriptions\n        length\n        }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PlaceWord($puzzleId: ID!, $input: PlaceWordInput!) {\n    placeWord(puzzleId: $puzzleId, input: $input) {\n      ...PuzzleGrid_placedWord\n    }\n  }\n"): (typeof documents)["\n  mutation PlaceWord($puzzleId: ID!, $input: PlaceWordInput!) {\n    placeWord(puzzleId: $puzzleId, input: $input) {\n      ...PuzzleGrid_placedWord\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment WordList_puzzle on Puzzle {\n    id\n    words {\n      id\n      startX\n      startY\n      isHorizontal\n      word {\n        word\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment WordList_puzzle on Puzzle {\n    id\n    words {\n      id\n      startX\n      startY\n      isHorizontal\n      word {\n        word\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetWords {\n    words {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n"): (typeof documents)["\n  query GetWords {\n    words {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateWord($input: CreateWordInput!) {\n    createWord(input: $input) {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWord($input: CreateWordInput!) {\n    createWord(input: $input) {\n      id\n      word\n      descriptions\n      length\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                fragment NewWord on Word {\n                  id\n                  word\n                  descriptions\n                  length\n                }\n              "): (typeof documents)["\n                fragment NewWord on Word {\n                  id\n                  word\n                  descriptions\n                  length\n                }\n              "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;