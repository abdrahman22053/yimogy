import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { HomePage } from './pages/HomePage'
import { EmojiPage } from './pages/EmojiPage'
import { AITranslationPage } from './pages/AITranslationPage'
import { ExplorePage } from './pages/ExplorePage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-ocean-200">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/emoji" element={<EmojiPage />} />
            <Route path="/ai-translation" element={<AITranslationPage />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}