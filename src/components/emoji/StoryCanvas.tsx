import React, { useState } from 'react'
import { useDnd } from '../../contexts/DndContext'
import { Trash2, RefreshCw } from 'lucide-react'
import { translateWithAI } from '../../utils/aiTranslator'
import { LottieEmoji } from '../animations/LottieEmoji'

interface StoryCanvasProps {
  story: string[]
  setStory: React.Dispatch<React.SetStateAction<string[]>>
}

export function StoryCanvas({ story, setStory }: StoryCanvasProps) {
  const { onDrop } = useDnd()
  const [translation, setTranslation] = useState<string>('')
  const [isTranslating, setIsTranslating] = useState(false)

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const emoji = e.dataTransfer.getData('emoji')
    setStory((prev) => [...prev, emoji])
    
    // Translate the updated story
    const updatedStory = [...story, emoji]
    if (updatedStory.length > 0) {
      try {
        setIsTranslating(true)
        const result = await translateWithAI(updatedStory.join(' '), true)
        setTranslation(result)
      } catch (error) {
        console.error('Translation error:', error)
      } finally {
        setIsTranslating(false)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeEmoji = (index: number) => {
    setStory((prev) => {
      const newStory = prev.filter((_, i) => i !== index)
      // Update translation when removing emoji
      if (newStory.length > 0) {
        translateWithAI(newStory.join(' '), true)
          .then(setTranslation)
          .catch(console.error)
      } else {
        setTranslation('')
      }
      return newStory
    })
  }

  const refreshTranslation = async () => {
    if (story.length > 0) {
      try {
        setIsTranslating(true)
        const result = await translateWithAI(story.join(' '), true)
        setTranslation(result)
      } catch (error) {
        console.error('Translation error:', error)
      } finally {
        setIsTranslating(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div
        className="bg-gray-50 rounded-lg p-4 min-h-[200px]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className="text-lg font-medium text-gray-700 mb-4">Your Story</h3>
        <div className="flex flex-wrap gap-2">
          {story.map((emoji, index) => (
            <div
              key={index}
              className="relative group text-3xl p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {emoji}
              <button
                onClick={() => removeEmoji(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
        {story.length === 0 && (
          <div className="text-gray-400 text-center mt-8">
            Drag and drop emojis here to create your story
          </div>
        )}
      </div>

      {story.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Story Translation</h4>
            <button
              onClick={refreshTranslation}
              className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50 transition-colors"
              disabled={isTranslating}
            >
              <RefreshCw size={16} className={isTranslating ? 'animate-spin' : ''} />
            </button>
          </div>
          {isTranslating ? (
            <div className="flex items-center justify-center py-4">
              <LottieEmoji type="sparkles" size={40} />
              <span className="ml-2 text-gray-500">Translating...</span>
            </div>
          ) : (
            <p className="text-gray-600 p-2 bg-gray-50 rounded min-h-[60px]">
              {translation || 'Translation will appear here'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}