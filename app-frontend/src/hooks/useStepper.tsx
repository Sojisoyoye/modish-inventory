import React, { createContext, useContext, useState } from 'react'

type StepperContextType = {
  data: any
  saveStepData: Function
}

const StepperContext = createContext<StepperContextType>({
  data: null,
  saveStepData: () => {},
})

export const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within an AlertProvider')
  }
  return context
}

export const StepperProvider = ({ children }) => {
  const [data, setData] = useState(null)

  const saveStepData = (formData: any) => {
    setData(formData)
  }

  console.log('Data From CONTEXT', data)

  return (
    <StepperContext.Provider value={{ data, saveStepData }}>
      {children}
    </StepperContext.Provider>
  )
}
