import React from 'react'
import { EmojiTranslator } from '../components/emoji/EmojiTranslator'
import { EmojiStoryBuilder } from '../components/emoji/EmojiStoryBuilder'

export function EmojiPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <EmojiTranslator />
      <EmojiStoryBuilder />
    </div>
  )
}