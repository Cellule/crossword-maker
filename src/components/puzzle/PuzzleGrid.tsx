import { useMutation } from "@apollo/client"
import { Box, Button, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"
import { useSafeFragment } from "../../graphql/fragmentHelpers"
import { FragmentType, gql, unmaskFragmentData } from "../../graphql/generated"
import { useNotification } from "../common/NotificationContext"
import { WordSelectionDialog } from "./WordSelectionDialog"

const PUZZLE_GRID = gql(`
  fragment PuzzleGrid_puzzle on Puzzle {
    id
    size
      words {
       ...PuzzleGrid_placedWord
      }
  }
`)

const PUZZLE_GRID_PLACED_WORD = gql(`
  fragment PuzzleGrid_placedWord on PlacedWord {
    id
    startX
      startY
      isHorizontal
        word {
          id
        word
        descriptions
        length
        }
  }
`)

const PLACE_WORD = gql(`
  mutation PlaceWord($puzzleId: ID!, $input: PlaceWordInput!) {
    placeWord(puzzleId: $puzzleId, input: $input) {
      ...PuzzleGrid_placedWord
    }
  }
`)

interface PuzzleGridProps {
  puzzle: FragmentType<typeof PUZZLE_GRID>
}

export function PuzzleGrid({ puzzle: _puzzle }: PuzzleGridProps) {
  const puzzle = useSafeFragment(PUZZLE_GRID, _puzzle)
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const [isWordDialogOpen, setIsWordDialogOpen] = useState(false)
  const { showNotification } = useNotification()

  const [placeWord] = useMutation(PLACE_WORD, {
    onCompleted() {
      showNotification({
        message: "Word placed successfully",
        severity: "success",
      })
      setSelectedCell(null)
    },
    onError(error) {
      showNotification({
        message: `Failed to place word: ${error.message}`,
        severity: "error",
      })
    },
  })

  const handleCellClick = (x: number, y: number) => {
    setSelectedCell({ x, y })
  }

  const handleWordSelect = async (wordId: string) => {
    if (!selectedCell) return

    try {
      await placeWord({
        variables: {
          puzzleId: puzzle.id,
          input: {
            wordId,
            startX: selectedCell.x,
            startY: selectedCell.y,
            isHorizontal: orientation === "horizontal",
          },
        },
      })
      setIsWordDialogOpen(false)
    } catch {
      // Error handled by onError callback
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <ToggleButtonGroup
          value={orientation}
          exclusive
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange={(_, value) => void (value && setOrientation(value))}
          size='small'
        >
          <ToggleButton value='horizontal'>Horizontal</ToggleButton>
          <ToggleButton value='vertical'>Vertical</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant='contained'
          disabled={!selectedCell}
          onClick={() => setIsWordDialogOpen(true)}
        >
          Place Word
        </Button>
      </Box>

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
          const words = unmaskFragmentData(PUZZLE_GRID_PLACED_WORD, puzzle.words)
          const cell = words.find((word) => {
            if (word.isHorizontal) {
              return (
                y === word.startY && x >= word.startX && x < word.startX + word.word.word.length
              )
            } else {
              return (
                x === word.startX && y >= word.startY && y < word.startY + word.word.word.length
              )
            }
          })

          const isSelected = selectedCell?.x === x && selectedCell?.y === y

          return (
            <Paper
              key={i}
              variant='outlined'
              onClick={() => handleCellClick(x, y)}
              sx={{
                aspectRatio: "1/1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: isSelected ? "primary.main" : cell ? "action.selected" : undefined,
                color: isSelected ? "primary.contrastText" : undefined,
                "&:hover": {
                  bgcolor: isSelected ? "primary.dark" : cell ? "action.selected" : "action.hover",
                },
              }}
            >
              {cell?.word.word[cell.isHorizontal ? x - cell.startX : y - cell.startY]}
            </Paper>
          )
        })}
      </Paper>

      <WordSelectionDialog
        open={isWordDialogOpen}
        onClose={() => setIsWordDialogOpen(false)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSelectWord={handleWordSelect}
      />
    </Box>
  )
}
