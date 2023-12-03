import { Alert, AlertTitle, AlertColor, Snackbar } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'

export class MessageDto {
  type?: AlertColor
  message?: string
  headline?: string
  open?: boolean

  constructor(
    type?: AlertColor,
    message?: string,
    headline?: string,
    open?: boolean
  ) {
    this.type = type
    this.message = message
    this.headline = headline
    this.open = open
  }
}

type AlertContextType = {
  message: MessageDto | null
  info: Function
  warning: Function
  error: Function
  success: Function
}

const AlertContext = createContext<AlertContextType>({
  message: null,
  info: () => {},
  warning: () => {},
  error: () => {},
  success: () => {},
})

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState<MessageDto | null>(null)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setMessage(null)
  }

  const info = (message: string, headline?: string) => {
    setMessage(new MessageDto('info', message, headline, true))
  }

  const warning = (message: string, headline?: string) => {
    setMessage(new MessageDto('info', message, headline, true))
  }

  const error = (message: string, headline?: string) => {
    setMessage(new MessageDto('error', message, headline, true))
  }

  const success = (message: string, headline?: string) => {
    setMessage(new MessageDto('success', message, headline, true))
  }

  return (
    <AlertContext.Provider value={{ message, info, warning, error, success }}>
      {!!message && (
        <Snackbar
          open={message.open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={message.type}
            onClose={handleClose}
            sx={{ width: '100%' }}
          >
            <AlertTitle>{message.headline}</AlertTitle>
            {message.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </AlertContext.Provider>
  )
}
