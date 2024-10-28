import { CreatePuzzleInput } from "./generated/graphql"

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

// Data source class to handle localStorage operations
export class LocalStorageDataSource {
  private STORAGE_KEYS = {
    PUZZLES: "crossword-maker:puzzles",
    WORDS: "crossword-maker:words",
  } as const

  private data: StoredData

  constructor() {
    this.data = this.loadData()
  }

  private loadData(): StoredData {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const puzzles = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PUZZLES) ?? "[]")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const words = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.WORDS) ?? "[]")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { puzzles, words }
  }

  private saveData() {
    localStorage.setItem(this.STORAGE_KEYS.PUZZLES, JSON.stringify(this.data.puzzles))
    localStorage.setItem(this.STORAGE_KEYS.WORDS, JSON.stringify(this.data.words))
  }

  getAllWords() {
    return this.data.words
  }

  getWord(id: string) {
    return this.data.words.find((w) => w.id === id) ?? null
  }

  getPuzzles(first: number, after?: string | null) {
    let puzzles = [...this.data.puzzles].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    if (after) {
      const afterId = this.decodeCursor(after)
      const index = puzzles.findIndex((p) => p.id === afterId)
      if (index !== -1) {
        puzzles = puzzles.slice(index + 1)
      }
    }

    const edges = puzzles.slice(0, first)
    const hasNextPage = puzzles.length > first
    const endCursor = edges.length > 0 ? this.encodeCursor(edges[edges.length - 1].id) : ""

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    }
  }

  getPuzzle(id: string) {
    return this.data.puzzles.find((p) => p.id === id)
  }

  createWord(input: { word: string; descriptions: string[] }) {
    const word = {
      id: this.generateId(),
      ...input,
      length: input.word.length,
    }

    this.data.words.push(word)
    this.saveData()

    return word
  }

  createPuzzle(input: CreatePuzzleInput): GQLPuzzle {
    const puzzle: GQLPuzzle = {
      id: this.generateId(),
      ...input,
      words: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.data.puzzles.push(puzzle)
    this.saveData()

    return puzzle
  }

  // ... other methods

  private generateId() {
    return Math.random().toString(36).substr(2, 9)
  }

  private encodeCursor(id: string) {
    return btoa(id)
  }

  private decodeCursor(cursor: string) {
    return atob(cursor)
  }

  deletePuzzle(id: string): boolean {
    const initialLength = this.data.puzzles.length
    this.data.puzzles = this.data.puzzles.filter((p) => p.id !== id)
    this.saveData()
    return this.data.puzzles.length < initialLength
  }
}
