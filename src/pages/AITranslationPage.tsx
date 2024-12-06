import React, { useState } from 'react'
import { ArrowDownUp, Sparkles } from 'lucide-react'
import { TranslationInput } from '../components/translation/TranslationInput'
import { TranslationResult } from '../components/translation/TranslationResult'
import { useTranslationService } from '../hooks/useTranslationService'
import { motion } from 'framer-motion'

export function AITranslationPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'text-to-emoji' | 'emoji-to-text'>('text-to-emoji')
  const { translate, isLoading, error, clearError } = useTranslationService()

  const handleTranslate = async () => {
    const translation = await translate(input)
    if (translation) {
      setResult(translation.text)
    }
  }

  const toggleMode = () => {
    setMode(prev => prev === 'text-to-emoji' ? 'emoji-to-text' : 'text-to-emoji')
    setInput(result)
    setResult('')
    clearError()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sea Translation</h1>
        <p className="mt-2 text-gray-600">Transform your text into ocean-themed emojis and back</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'text-to-emoji' ? 'Text to Emoji' : 'Emoji to Text'}
          </h2>
          <button
            onClick={toggleMode}
            className="flex items-center space-x-2 text-ocean-600 hover:text-ocean-700"
          >
            <ArrowDownUp size={20} />
            <span>Switch Mode</span>
          </button>
        </div>

        <div className="space-y-6">
          <TranslationInput
            value={input}
            onChange={setInput}
            placeholder={mode === 'text-to-emoji' ? 'Enter your text...' : 'Enter emojis...'}
            label={mode === 'text-to-emoji' ? 'Text' : 'Emojis'}
            error={error}
            disabled={isLoading}
          />

          <motion.button
            onClick={handleTranslate}
            disabled={isLoading || !input.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-ocean-600 text-white py-4 px-6 rounded-lg hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={20} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Translating...' : 'Translate'}</span>
          </motion.button>

          {result && (
            <TranslationResult text={result} type={mode} />
          )}
        </div>
      </div>
    </div>
  )
}