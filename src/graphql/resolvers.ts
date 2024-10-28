import { GraphQLError } from "graphql"
import type { Resolvers } from "./generated/resolvers-types"

export const resolvers: Resolvers = {
  Query: {
    words: (_parent, _args, { dataSources }) => {
      return dataSources.storage.getAllWords()
    },

    word: (_parent, { id }, { dataSources }) => {
      return dataSources.storage.getWord(id) ?? null
    },

    puzzles: (_parent, { first, after }, { dataSources }) => {
      return dataSources.storage.getPuzzles(first, after)
    },

    puzzle: (_parent, { id }, { dataSources }) => {
      return dataSources.storage.getPuzzle(id) ?? null
    },
  },

  Mutation: {
    createWord: (_parent, { input }, { dataSources }) => {
      return dataSources.storage.createWord(input)
    },

    createPuzzle: (_parent, { input }, { dataSources }) => {
      if (input.size < 3 || input.size > 25) {
        throw new GraphQLError("Puzzle size must be between 3 and 25")
      }
      return dataSources.storage.createPuzzle(input)
    },

    deletePuzzle: (_parent, { id }, { dataSources }) => {
      const puzzle = dataSources.storage.getPuzzle(id)
      if (!puzzle) {
        throw new GraphQLError("Puzzle not found")
      }
      return dataSources.storage.deletePuzzle(id)
    },

    // ... other mutations
  },

  Puzzle: {},

  PlacedWord: {
    word: (placedWord, _args, { dataSources }) => {
      return dataSources.storage.getWord(placedWord.wordId)
    },
  },
}
