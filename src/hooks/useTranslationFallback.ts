import { useCallback } from 'react'
import { TranslationResult } from '../types/translation'
import { emojiMappings } from '../utils/emojiMappings'

export function useTranslationFallback() {
  const getFallbackTranslation = useCallback((text: string): TranslationResult => {
    const hasEmoji = /\p{Emoji}/u.test(text)
    const translatedText = hasEmoji ? textFromEmojis(text) : emojisFromText(text)

    return {
      text: translatedText,
      type: hasEmoji ? 'emoji-to-text' : 'text-to-emoji'
    }
  }, [])

  return { getFallbackTranslation }
}

function textFromEmojis(input: string): string {
  const emojiToWords = new Map(
    Object.entries(emojiMappings).flatMap(([word, emojis]) =>
      emojis.map(emoji => [emoji, word])
    )
  )
  
  const emojis = Array.from(input.matchAll(/\p{Emoji}/gu)).map(m => m[0])
  const words = emojis
    .map(emoji => emojiToWords.get(emoji) || emoji)
    .filter(Boolean)
  
  return words
    .map((word, index) => index === 0 ? capitalize(word) : word)
    .join(' ')
}

function emojisFromText(input: string): string {
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}