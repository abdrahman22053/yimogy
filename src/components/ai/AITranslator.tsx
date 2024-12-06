import React, { useState } from 'react'
import { ArrowDownUp, Sparkles, AlertCircle } from 'lucide-react'
import { useAITranslation } from '../../utils/aiTranslator'
import { useTranslationHistory } from '../../hooks/useTranslationHistory'
import { LottieEmoji } from '../animations/LottieEmoji'

export function AITranslator() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isEmojiToText, setIsEmojiToText] = useState(false)
  const { translate, isLoading, error } = useAITranslation()
  const { addToHistory } = useTranslationHistory()

  const handleTranslate = async () => {
    try {
      const result = await translate(inputText, isEmojiToText)
      setOutputText(result)
      addToHistory({
        type: isEmojiToText ? 'Emoji to Text' : 'Text to Emoji',
        input: inputText,
        output: result
      })
    } catch (err) {
      console.error('Translation error:', err)
    }
  }

  const handleSwitch = () => {
    setIsEmojiToText(!isEmojiToText)
    setInputText(outputText)
    setOutputText(inputText)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEmojiToText ? 'Emoji to Text' : 'Text to Emoji'}
          </h2>
          {isLoading && (
            <div className="w-6 h-6">
              <LottieEmoji type="sparkles" size={24} />
            </div>
          )}
        </div>
        <button
          onClick={handleSwitch}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowDownUp size={20} />
          <span>Switch</span>
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isEmojiToText ? 'Enter Emojis' : 'Enter Text'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-40 resize-none"
            placeholder={isEmojiToText ? '😊 🌟 🎉' : 'Enter your text here...'}
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={isLoading || !inputText}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles size={20} className={isLoading ? 'animate-spin' : ''} />
          <span>{isLoading ? 'Translating...' : 'Translate'}</span>
        </button>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {outputText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEmojiToText ? 'Translation' : 'Emoji Translation'}
            </label>
            <div className="w-full min-h-[160px] p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className={isEmojiToText ? 'text-base' : 'text-2xl'}>
                {outputText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}