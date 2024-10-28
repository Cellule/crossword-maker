import { Reference, StoreObject, useMutation } from "@apollo/client"
import { Delete, Edit } from "@mui/icons-material"
import { Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { useSafeFragment } from "../../graphql/fragmentHelpers"
import { FragmentType, gql } from "../../graphql/generated"
import { useNotification } from "../common/NotificationContext"

const PUZZLE_FRAGMENT = gql(`
  fragment PuzzleCard_puzzle on Puzzle {
    id
    name
    size
    createdAt
    updatedAt
  }
`)

const DELETE_PUZZLE = gql(`
  mutation DeletePuzzle($id: ID!) {
    deletePuzzle(id: $id)
  }
`)

interface PuzzleCardProps {
  puzzle: FragmentType<typeof PUZZLE_FRAGMENT>
}

// Type for the puzzles field in the cache
// type PuzzlesConnection = NonNullable<GetPuzzlesQuery["puzzles"]>
type CachedPuzzle = Reference | StoreObject | undefined

export function PuzzleCard({ puzzle: _puzzle }: PuzzleCardProps) {
  const puzzle = useSafeFragment(PUZZLE_FRAGMENT, _puzzle)
  const { showNotification } = useNotification()
  const formattedDate = new Date(puzzle.createdAt).toLocaleDateString()

  const [deletePuzzle, { loading }] = useMutation(DELETE_PUZZLE, {
    variables: { id: puzzle.id },
    update(cache) {
      cache.modify({
        fields: {
          puzzles(existing, { readField }) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...existing,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              edges: existing.edges.filter((p: CachedPuzzle) => {
                return readField("id", p) !== puzzle.id
              }),
            }
          },
        },
      })
    },
    onCompleted() {
      showNotification({
        message: `Puzzle "${puzzle.name}" was deleted successfully`,
        severity: "success",
      })
    },
    onError(error) {
      showNotification({
        message: `Failed to delete puzzle: ${error.message}`,
        severity: "error",
      })
    },
  })

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this puzzle?")) {
      try {
        await deletePuzzle()
      } catch {
        // Error is handled by onError callback
      }
    }
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant='h6' component='h3' gutterBottom>
          {puzzle.name}
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          {puzzle.size}x{puzzle.size} grid
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          Created: {formattedDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ ml: "auto" }}>
          <IconButton aria-label='edit puzzle'>
            <Edit />
          </IconButton>
          <IconButton
            aria-label='delete puzzle'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleDelete}
            disabled={loading}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}
