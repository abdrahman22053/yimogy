import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

interface TranslationResponse {
  original: string
  converted: string
  type: 'emoji-to-text' | 'text-to-emoji'
  status: string
}

export async function translateWithAI(input: string, isEmojiToText: boolean): Promise<string> {
  if (!input.trim()) {
    return ''
  }

  try {
    const response = await axios.post<TranslationResponse>(`${API_URL}/convert`, {
      text: input
    })
    
    if (response.data.status === 'success') {
      return response.data.converted
    }
    
    throw new Error('Translation failed')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Translation network error:', error.message)
    } else {
      console.error('Translation error:', error)
    }
    return fallbackTranslation(input, isEmojiToText)
  }
}

const emojiMappings: Record<string, string[]> = {
  'happy': ['😊', '😃', '😄'],
  'sad': ['😢', '😭', '😔'],
  'love': ['❤️', '🥰', '😍'],
  'ocean': ['🌊', '🐋', '🐬'],
  'fish': ['🐟', '🐠', '🐡'],
  'shark': ['🦈'],
  'wave': ['🌊'],
  'water': ['💧', '🌊', '💦']
}

function fallbackTranslation(input: string, isEmojiToText: boolean): string {
  if (!input.trim()) {
    return ''
  }

  if (isEmojiToText) {
    const emojiToWords = new Map(
      Object.entries(emojiMappings).flatMap(([word, emojis]) =>
        emojis.map(emoji => [emoji, word])
      )
    )
    
    const emojis = Array.from(input.matchAll(/\p{Emoji}/gu)).map(m => m[0])
    return emojis
      .map(emoji => emojiToWords.get(emoji) || emoji)
      .filter(Boolean)
      .join(' ')
  }

  const words = input.toLowerCase().split(/\s+/)
  return words
    .map(word => {
      const matchedEmojis = emojiMappings[word]
      return matchedEmojis
        ? matchedEmojis[Math.floor(Math.random() * matchedEmojis.length)]
        : word
    })
    .join(' ')
}

export function useAITranslation() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translate = async (input: string, isEmojiToText: boolean) => {
    if (!input.trim()) {
      return ''
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const result = await translateWithAI(input, isEmojiToText)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed'
      setError(errorMessage)
      return fallbackTranslation(input, isEmojiToText)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    translate,
    isLoading,
    error
  }
}