import React, { createContext, useContext, ReactNode } from 'react'

interface DndContextType {
  onDragStart: (e: React.DragEvent, emoji: string) => void
  onDrop: (e: React.DragEvent) => void
}

const DndContext = createContext<DndContextType | undefined>(undefined)

export function DndProvider({ children }: { children: ReactNode }) {
  const onDragStart = (e: React.DragEvent, emoji: string) => {
    e.dataTransfer.setData('emoji', emoji)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const emoji = e.dataTransfer.getData('emoji')
    return emoji
  }

  return (
    <DndContext.Provider value={{ onDragStart, onDrop }}>
      {children}
    </DndContext.Provider>
  )
}

export const useDnd = () => {
  const context = useContext(DndContext)
  if (!context) {
    throw new Error('useDnd must be used within a DndProvider')
  }
  return context
}