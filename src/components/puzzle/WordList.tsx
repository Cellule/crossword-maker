import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { useSafeFragment } from "../../graphql/fragmentHelpers"
import { FragmentType, gql } from "../../graphql/generated"

const WORD_LIST = gql(`
  fragment WordList_puzzle on Puzzle {
    id
    words {
      id
      startX
      startY
      isHorizontal
      word {
        word
      }
    }
  }
`)

interface WordListProps {
  puzzle: FragmentType<typeof WORD_LIST>
}

export function WordList({ puzzle: _puzzle }: WordListProps) {
  const puzzle = useSafeFragment(WORD_LIST, _puzzle)
  return (
    <Paper sx={{ p: 2, flexGrow: 1 }}>
      <Typography variant='h6' gutterBottom>
        Placed Words
      </Typography>
      <List>
        {puzzle.words.map((placedWord) => (
          <ListItem key={placedWord.id}>
            <ListItemText
              primary={placedWord.word?.word ?? ""}
              secondary={`${placedWord.isHorizontal ? "Horizontal" : "Vertical"} at (${
                placedWord.startX
              }, ${placedWord.startY})`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
