import { Alert, Snackbar } from "@mui/material"
import { createContext, useCallback, useContext, useState } from "react"

interface Notification {
  message: string
  severity: "success" | "error" | "info" | "warning"
}

interface NotificationContextType {
  showNotification: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [open, setOpen] = useState(false)

  const showNotification = useCallback((newNotification: Notification) => {
    setNotification(newNotification)
    setOpen(true)
  }, [])

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {notification ? (
          <Alert onClose={handleClose} severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
