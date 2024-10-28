import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./components/home/HomePage"
import { RootLayout } from "./components/layout/RootLayout"
import { PuzzleEditor } from "./components/puzzle/PuzzleEditor"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "puzzle/:puzzleId",
          element: <PuzzleEditor />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)
