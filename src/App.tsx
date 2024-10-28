import { NotificationProvider } from "./components/common/NotificationContext"
import { HomePage } from "./components/home/HomePage"
import { AppLayout } from "./components/layout/AppLayout"

function App() {
  return (
    <NotificationProvider>
      <AppLayout>
        <HomePage />
      </AppLayout>
    </NotificationProvider>
  )
}

export default App
