import { useMutation, useQuery } from "@apollo/client"
import { Add, Close } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { gql } from "../../graphql/generated"
import { useNotification } from "../common/NotificationContext"

const GET_WORDS = gql(`
  query GetWords {
    words {
      id
      word
      descriptions
      length
    }
  }
`)

const CREATE_WORD = gql(`
  mutation CreateWord($input: CreateWordInput!) {
    createWord(input: $input) {
      id
      word
      descriptions
      length
    }
  }
`)

interface WordSelectionDialogProps {
  open: boolean
  onClose: () => void
  onSelectWord: (wordId: string) => void
}

export function WordSelectionDialog({ open, onClose, onSelectWord }: WordSelectionDialogProps) {
  const [search, setSearch] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [newWord, setNewWord] = useState("")
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [newDescription, setNewDescription] = useState("")
  const { showNotification } = useNotification()

  const { data } = useQuery(GET_WORDS)
  const [createWord] = useMutation(CREATE_WORD, {
    update(cache, { data: newData }) {
      cache.modify({
        fields: {
          words(existing = []) {
            const newWordRef = cache.writeFragment({
              data: newData?.createWord,
              fragment: gql(`
                fragment NewWord on Word {
                  id
                  word
                  descriptions
                  length
                }
              `),
            })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return [...existing, newWordRef]
          },
        },
      })
    },
  })

  const filteredWords = data?.words.filter((word) =>
    word.word.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddDescription = () => {
    if (newDescription.trim()) {
      setDescriptions([...descriptions, newDescription.trim()])
      setNewDescription("")
    }
  }

  const handleRemoveDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index))
  }

  const handleCreateWord = async () => {
    if (!newWord.trim()) {
      showNotification({
        message: "Word cannot be empty",
        severity: "error",
      })
      return
    }

    if (descriptions.length === 0) {
      showNotification({
        message: "Add at least one description",
        severity: "error",
      })
      return
    }

    try {
      const result = await createWord({
        variables: {
          input: {
            word: newWord.trim(),
            descriptions,
          },
        },
      })

      if (result.data?.createWord) {
        onSelectWord(result.data.createWord.id)
        showNotification({
          message: "Word created successfully",
          severity: "success",
        })
      }
    } catch (error) {
      showNotification({
        message: `Failed to create word: ${error instanceof Error ? error.message : "Unknown error"}`,
        severity: "error",
      })
    }
  }

  const handleClose = () => {
    setSearch("")
    setIsCreating(false)
    setNewWord("")
    setDescriptions([])
    setNewDescription("")
    onClose()
  }

  const noMatchingWords = search && (!filteredWords || filteredWords.length === 0)

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>{isCreating ? "Create New Word" : "Select a Word"}</DialogTitle>
      <DialogContent>
        {isCreating ? (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              label='Word'
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Descriptions
              </Typography>
              <Stack spacing={1}>
                {descriptions.map((desc, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography flex={1}>{desc}</Typography>
                    <IconButton size='small' onClick={() => handleRemoveDescription(index)}>
                      <Close fontSize='small' />
                    </IconButton>
                  </Box>
                ))}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    size='small'
                    placeholder='Add description'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddDescription()}
                    fullWidth
                  />
                  <Button onClick={handleAddDescription}>Add</Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <>
            <TextField
              autoFocus
              margin='dense'
              label='Search words'
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {filteredWords?.map((word) => (
                <ListItem key={word.id} disablePadding>
                  <ListItemButton onClick={() => onSelectWord(word.id)}>
                    <ListItemText primary={word.word} secondary={word.descriptions.join(" • ")} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {noMatchingWords && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography color='text.secondary' gutterBottom>
                  No matching words found
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    setNewWord(search)
                    setIsCreating(true)
                  }}
                >
                  Create &quot;{search}&quot;
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {isCreating && <Button onClick={() => setIsCreating(false)}>Back to Search</Button>}
        <Button onClick={handleClose}>Cancel</Button>
        {isCreating && (
          <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleCreateWord}
            variant='contained'
          >
            Create Word
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
