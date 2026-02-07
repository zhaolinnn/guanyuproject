import { createContext, useContext, useState, useCallback } from 'react'

const CompletionsContext = createContext(null)

export function CompletionsProvider({ children }) {
  const [invalidateKey, setInvalidateKey] = useState(0)
  const invalidateCompletions = useCallback(() => {
    setInvalidateKey((k) => k + 1)
  }, [])
  return (
    <CompletionsContext.Provider value={{ invalidateKey, invalidateCompletions }}>
      {children}
    </CompletionsContext.Provider>
  )
}

export function useCompletionsInvalidate() {
  const ctx = useContext(CompletionsContext)
  return ctx?.invalidateCompletions ?? (() => {})
}

export function useCompletionsInvalidateKey() {
  const ctx = useContext(CompletionsContext)
  return ctx?.invalidateKey ?? 0
}
