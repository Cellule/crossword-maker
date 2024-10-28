import { useMutation } from "@apollo/client"
import { ArrowDownward, ArrowForward } from "@mui/icons-material"
import { Box, Button, Paper } from "@mui/material"
import { useEffect, useState } from "react"
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

interface SelectedCell {
  x: number
  y: number
  isHorizontal: boolean
}

export function PuzzleGrid({ puzzle: _puzzle }: PuzzleGridProps) {
  const puzzle = useSafeFragment(PUZZLE_GRID, _puzzle)
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  const [isWordDialogOpen, setIsWordDialogOpen] = useState(false)
  const [initialSearch, setInitialSearch] = useState("")
  const { showNotification } = useNotification()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell || isWordDialogOpen) return

      if (/^[a-zA-Z]$/.test(event.key)) {
        setInitialSearch(event.key)
        setIsWordDialogOpen(true)
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [isWordDialogOpen, selectedCell])

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
    if (selectedCell?.x === x && selectedCell?.y === y) {
      // Toggle direction if clicking same cell
      setSelectedCell({ x, y, isHorizontal: !selectedCell.isHorizontal })
    } else {
      // Default to vertical (false) on first click
      setSelectedCell({ x, y, isHorizontal: false })
    }
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
            isHorizontal: selectedCell.isHorizontal,
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
              return y === word.startY && x >= word.startX && x < word.startX + word.word.length
            } else {
              return x === word.startX && y >= word.startY && y < word.startY + word.word.length
            }
          })

          const isSelected = selectedCell?.x === x && selectedCell?.y === y
          const letter = cell?.word.word[cell.isHorizontal ? x - cell.startX : y - cell.startY]

          return (
            <Paper
              key={i}
              variant='outlined'
              onClick={() => handleCellClick(x, y)}
              sx={{
                position: "relative",
                aspectRatio: "1/1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: isSelected ? "primary.main" : cell ? "action.selected" : undefined,
                color: isSelected ? "primary.contrastText" : undefined,
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  bgcolor: isSelected ? "primary.dark" : cell ? "action.selected" : "action.hover",
                },
              }}
            >
              {!isSelected && letter}
              {isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    color: "primary.contrastText",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  {selectedCell.isHorizontal ? <ArrowForward /> : <ArrowDownward />}
                </Box>
              )}
            </Paper>
          )
        })}
      </Paper>

      <WordSelectionDialog
        open={isWordDialogOpen}
        onClose={() => {
          setIsWordDialogOpen(false)
          setInitialSearch("")
        }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSelectWord={handleWordSelect}
        initialSearch={initialSearch}
      />
    </Box>
  )
}
