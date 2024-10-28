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

    placeWord: (_parent, { puzzleId, input }, { dataSources }) => {
      const puzzle = dataSources.storage.getPuzzle(puzzleId)
      if (!puzzle) {
        throw new GraphQLError("Puzzle not found")
      }

      const word = dataSources.storage.getWord(input.wordId)
      if (!word) {
        throw new GraphQLError("Word not found")
      }

      // Check if word fits in puzzle
      if (input.isHorizontal && input.startX + word.length > puzzle.size) {
        throw new GraphQLError("Word does not fit horizontally")
      }
      if (!input.isHorizontal && input.startY + word.length > puzzle.size) {
        throw new GraphQLError("Word does not fit vertically")
      }

      // Check for intersections
      for (let i = 0; i < word.length; i++) {
        const x = input.isHorizontal ? input.startX + i : input.startX
        const y = input.isHorizontal ? input.startY : input.startY + i

        const intersectingWord = puzzle.words.find((placedWord) => {
          if (placedWord.isHorizontal) {
            return (
              y === placedWord.startY &&
              x >= placedWord.startX &&
              x < placedWord.startX + dataSources.storage.getWord(placedWord.wordId)!.length
            )
          } else {
            return (
              x === placedWord.startX &&
              y >= placedWord.startY &&
              y < placedWord.startY + dataSources.storage.getWord(placedWord.wordId)!.length
            )
          }
        })

        if (intersectingWord) {
          throw new GraphQLError("Word intersects with existing word")
        }
      }

      return dataSources.storage.placeWord(puzzleId, input)
    },

    // ... other mutations
  },

  Puzzle: {},

  PlacedWord: {
    word: (placedWord, _args, { dataSources }) => {
      return (
        dataSources.storage.getWord(placedWord.wordId) ?? {
          id: "unknown",
          word: "<missing>",
          descriptions: [],
          length: 0,
        }
      )
    },
  },
}
