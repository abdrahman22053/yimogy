import React, { useState } from 'react'
import { translateToEmojis } from '../../utils/emojiTranslator'

export function EmojiTranslator() {
  const [text, setText] = useState('')
  const [emojis, setEmojis] = useState('')

  const handleTranslate = () => {
    const translated = translateToEmojis(text)
    setEmojis(translated)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Emoji Translator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Enter your text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>
        <button
          onClick={handleTranslate}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Translate to Emojis
        </button>
        {emojis && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Translation</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md text-2xl">{emojis}</div>
          </div>
        )}
      </div>
    </div>
  )
}