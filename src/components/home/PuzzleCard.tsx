import { Delete, Edit } from "@mui/icons-material"
import { Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { useSafeFragment } from "../../graphql/fragmentHelpers"
import { FragmentType, gql } from "../../graphql/generated"

const PUZZLE_FRAGMENT = gql(`
  fragment PuzzleCard_puzzle on Puzzle {
    id
    name
    size
    createdAt
    updatedAt
  }
`)

interface PuzzleCardProps {
  puzzle: FragmentType<typeof PUZZLE_FRAGMENT>
}

export function PuzzleCard({ puzzle: _puzzle }: PuzzleCardProps) {
  const puzzle = useSafeFragment(PUZZLE_FRAGMENT, _puzzle)
  const formattedDate = new Date(puzzle.createdAt).toLocaleDateString()

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
          <IconButton aria-label='delete puzzle'>
            <Delete />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}
