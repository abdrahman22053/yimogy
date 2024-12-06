import React, { useState } from 'react'
import { DndProvider } from '../../contexts/DndContext'
import { EmojiPalette } from './EmojiPalette'
import { StoryCanvas } from './StoryCanvas'

export function EmojiStoryBuilder() {
  const [story, setStory] = useState<string[]>([])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Story Builder</h2>
      <DndProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmojiPalette />
          <StoryCanvas story={story} setStory={setStory} />
        </div>
      </DndProvider>
    </div>
  )
}