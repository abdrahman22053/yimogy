import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { InteractiveEmoji } from '../animations/InteractiveEmoji'

interface NavItem {
  emoji: string
  path: string
  label: string
  description: string
}

const navItems: NavItem[] = [
  {
    emoji: '🏠',
    path: '/',
    label: 'Home',
    description: 'Return to main page'
  },
  {
    emoji: '🎨',
    path: '/emoji',
    label: 'Create',
    description: 'Build emoji stories'
  },
  {
    emoji: '🤖',
    path: '/ai-translation',
    label: 'Translate',
    description: 'AI-powered translations'
  },
  {
    emoji: '🌍',
    path: '/explore',
    label: 'Explore',
    description: 'Discover emoji stories'
  }
]

export function EmojiNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <div className="space-y-4">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              className="relative group"
              whileHover={{ scale: 1.1 }}
            >
              <button
                onClick={() => navigate(item.path)}
                className={`p-2 rounded-full transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                <InteractiveEmoji emoji={item.emoji} size="md" />
              </button>
              
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  )
}