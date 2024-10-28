# Cross Word Maker

This is a simple tool to help you create crossword puzzles.

## Features

- Web based tool.
- Specify the grid size.
- Enter words by selecting the starting cell and then entering the word.
- Words must be placed horizontally or vertically.
- Words cannot overlap.
- Words must be at least 3 characters long.
- Words cannot be diagonal.
- Store database of words to use for the crossword.
- The words in the database can contain multiple descriptions.
- The descriptions are used to generate clues.
- Solve the crossword puzzle.
- View the solution.
- Save the puzzle and solution to a file in chosen format: JSON, PDF, PNG.

## Tech

- Yarn as package manager.
- React
- Typescript
- Material UI
- CSS modules
- GraphQL Queries with Apollo Client targeting an in memory server
- Colocated components and GraphQL fragments with GraphQL Code Generator: Client Preset
- Static Single Page Application (SPA) - No backend
- Uses Local Storage as a database to save the puzzle and solution for initial MVP.
- Responsive design.
- Deploy to Github Pages.

