import { Paper } from "@mui/material"
import { useSafeFragment } from "../../graphql/fragmentHelpers"
import { FragmentType, gql } from "../../graphql/generated"

const PUZZLE_GRID = gql(`
  fragment PuzzleGrid_puzzle on Puzzle {
    size
    words {
      startX
      startY
      isHorizontal
      word {
        word
      }
    }
  }
`)

interface PuzzleGridProps {
  puzzle: FragmentType<typeof PUZZLE_GRID>
}

export function PuzzleGrid({ puzzle: _puzzle }: PuzzleGridProps) {
  const puzzle = useSafeFragment(PUZZLE_GRID, _puzzle)
  return (
    <Paper
      sx={{
        p: 2,
        display: "grid",
        gap: 0.5,
        gridTemplateColumns: `repeat(${puzzle.size}, 1fr)`,
        aspectRatio: "1/1",
        width: "min(600px, 100%)",
      }}
    >
      {Array.from({ length: puzzle.size * puzzle.size }).map((_, i) => {
        const x = i % puzzle.size
        const y = Math.floor(i / puzzle.size)
        const cell = puzzle.words.find((word) => {
          if (word.isHorizontal) {
            return y === word.startY && x >= word.startX && x < word.startX + word.word.word.length
          } else {
            return x === word.startX && y >= word.startY && y < word.startY + word.word.word.length
          }
        })

        return (
          <Paper
            key={i}
            variant='outlined'
            sx={{
              aspectRatio: "1/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: cell ? "action.selected" : undefined,
            }}
          >
            {cell?.word.word[cell.isHorizontal ? x - cell.startX : y - cell.startY]}
          </Paper>
        )
      })}
    </Paper>
  )
}
