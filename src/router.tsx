import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./components/home/HomePage"
import { RootLayout } from "./components/layout/RootLayout"

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
        // Add more routes here as needed
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)
