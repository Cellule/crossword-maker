import { useQuery } from "@apollo/client"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { gql } from "../../graphql/generated"
import { PuzzleGrid } from "./PuzzleGrid"
import { WordList } from "./WordList"

const GET_PUZZLE = gql(`
  query GetPuzzle($id: ID!) {
    puzzle(id: $id) {
      id
      name
      ...PuzzleGrid_puzzle
      ...WordList_puzzle
    }
  }
`)

export function PuzzleEditor() {
  const { puzzleId } = useParams<{ puzzleId: string }>()
  const { data, loading, error } = useQuery(GET_PUZZLE, {
    variables: { id: puzzleId! },
  })

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !data?.puzzle) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color='error'>
          {error ? `Error loading puzzle: ${error.message}` : "Puzzle not found"}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4'>{data.puzzle.name}</Typography>
      <PuzzleGrid puzzle={data.puzzle} />
      <WordList puzzle={data.puzzle} />
    </Box>
  )
}
