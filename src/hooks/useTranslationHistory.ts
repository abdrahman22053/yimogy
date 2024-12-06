import { useState, useEffect } from 'react'

interface TranslationItem {
  type: 'Text to Emoji' | 'Emoji to Text'
  input: string
  output: string
  timestamp: number
}

export function useTranslationHistory() {
  const [history, setHistory] = useState<TranslationItem[]>(() => {
    const saved = localStorage.getItem('translationHistory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('translationHistory', JSON.stringify(history))
  }, [history])

  const addToHistory = (item: Omit<TranslationItem, 'timestamp'>) => {
    setHistory(prev => [
      { ...item, timestamp: Date.now() },
      ...prev.slice(0, 9) // Keep only last 10 items
    ])
  }

  const removeFromHistory = (index: number) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  }
}