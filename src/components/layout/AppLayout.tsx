import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import type { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='h1'>
            Crossword Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component='main' sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  )
}
