import { useMutation } from "@apollo/client"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { gql } from "../../graphql/generated"
import type { CreatePuzzleInput } from "../../graphql/generated/graphql"

const CREATE_PUZZLE = gql(`
  mutation CreatePuzzle($input: CreatePuzzleInput!) {
    createPuzzle(input: $input) {
      id
      ...PuzzleCard_puzzle
    }
  }
`)

interface CreatePuzzleDialogProps {
  open: boolean
  onClose: () => void
}

export function CreatePuzzleDialog({ open, onClose }: CreatePuzzleDialogProps) {
  const [input, setInput] = useState<CreatePuzzleInput>({
    name: "",
    size: 15,
  })

  const [createPuzzle, { loading }] = useMutation(CREATE_PUZZLE, {
    onError(error) {
      console.error("Failed to create puzzle:", error)
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          puzzles(existing = { edges: [] }) {
            const newPuzzleRef = cache.writeFragment({
              data: data?.createPuzzle,
              fragmentName: "NewPuzzle",
              fragment: gql(`
                fragment NewPuzzle on Puzzle {
                  id
                  ...PuzzleCard_puzzle
                }
              `),
            })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...existing,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              edges: [newPuzzleRef, ...existing.edges],
            }
          },
        },
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPuzzle({ variables: { input } })
      onClose()
      setInput({ name: "", size: 15 }) // Reset form
    } catch (error) {
      console.error("Failed to create puzzle:", error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <form onSubmit={(form) => void handleSubmit(form)}>
        <DialogTitle>Create New Puzzle</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label='Puzzle Name'
              value={input.name}
              onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
              required
              autoFocus
            />
            <TextField
              label='Grid Size'
              type='number'
              value={input.size}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, size: parseInt(e.target.value, 10) }))
              }
              required
              inputProps={{ min: 3, max: 25 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained' disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
