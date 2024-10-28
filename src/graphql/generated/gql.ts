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

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;