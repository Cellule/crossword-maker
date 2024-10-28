import { useQuery } from "@apollo/client"
import { Add } from "@mui/icons-material"
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { gql } from "../../graphql/generated"
import { CreatePuzzleDialog } from "./CreatePuzzleDialog"
import { PuzzleCard } from "./PuzzleCard"

const GET_PUZZLES = gql(`
  query GetPuzzles {
    puzzles(first: 5) {
      edges {
        id
        ...PuzzleCard_puzzle @nonreactive
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`)

export function HomePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { data, loading, error } = useQuery(GET_PUZZLES)

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color='error'>Error loading puzzles: {error.message}</Typography>
      </Box>
    )
  }

  const puzzles = data?.puzzles?.edges ?? []
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant='h4' component='h2'>
          My Puzzles
        </Typography>
        <Button variant='contained' startIcon={<Add />} onClick={() => setIsCreateDialogOpen(true)}>
          Create New Puzzle
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : puzzles.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color='text.secondary'>No puzzles yet. Create your first one!</Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {puzzles.map((puzzle) => (
            <Grid item xs={4} sm={4} md={4} key={puzzle.id} display='flex'>
              <PuzzleCard puzzle={puzzle} />
            </Grid>
          ))}
        </Grid>
      )}

      <CreatePuzzleDialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
    </Box>
  )
}
