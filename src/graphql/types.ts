import { LocalStorageDataSource } from "./LocalStorageDataSource"

export interface GraphQLContext {
  dataSources: {
    storage: LocalStorageDataSource
  }
}

export interface GQLPuzzle {
  id: string
  name: string
  size: number
  words: GQLPlacedWord[]
  createdAt: string
  updatedAt: string
}

export interface GQLPlacedWord {
  id: string
  wordId: string
  startX: number
  startY: number
  isHorizontal: boolean
}

export interface GQLWord {
  id: string
  word: string
  descriptions: string[]
  length: number
}

export interface StoredData {
  puzzles: GQLPuzzle[]
  words: GQLWord[]
}
