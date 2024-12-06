import React, { useState } from 'react'
import { 
  Activity, 
  Users, 
  Star, 
  Heart, 
  MessageCircle, 
  Share2 
} from 'lucide-react'
import { PulsingEmoji } from '../components/animations/PulsingEmoji'
import { LottieEmoji } from '../components/animations/LottieEmoji'

interface Story {
  id: number
  author: string
  avatar: string
  emojis: string
  description: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

interface Trend {
  id: number
  emojis: string
  description: string
  usageCount: number
}

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'trending' | 'community'>('trending')
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      author: 'EmojiArtist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      emojis: '🌅 🏃‍♂️ 💪 🥗 💻 ⭐',
      description: 'My perfect productive day routine',
      likes: 234,
      comments: 45,
      shares: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'StoryTeller',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100&q=80',
      emojis: '🌲 🏕️ 🔥 🌙 ⛺ 🎸',
      description: 'Weekend camping adventure',
      likes: 189,
      comments: 32,
      shares: 8,
      isLiked: true
    },
    {
      id: 3,
      author: 'TravelEmoji',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      emojis: '✈️ 🗺️ 🎒 📸 🌍 💫',
      description: 'Planning my world tour',
      likes: 567,
      comments: 89,
      shares: 45,
      isLiked: false
    }
  ])

  const trends: Trend[] = [
    {
      id: 1,
      emojis: '🎯 💡 💪',
      description: 'Goal Setting',
      usageCount: 12453
    },
    {
      id: 2,
      emojis: '🌱 🥗 🏃‍♂️',
      description: 'Healthy Lifestyle',
      usageCount: 8932
    },
    {
      id: 3,
      emojis: '💻 ☕ 🎧',
      description: 'Work Mode',
      usageCount: 7845
    }
  ]

  const handleLike = (storyId: number) => {
    setStories(prev =>
      prev.map(story =>
        story.id === storyId
          ? {
              ...story,
              likes: story.isLiked ? story.likes - 1 : story.likes + 1,
              isLiked: !story.isLiked
            }
          : story
      )
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore YmojiVerse</h1>
        <p className="text-gray-600">Discover trending stories and popular emoji combinations</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-sm p-1">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'trending'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'community'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>Community</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {stories.map(story => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{story.author}</h3>
                  <p className="text-sm text-gray-500">Story Creator</p>
                </div>
              </div>
              <div className="text-4xl mb-4 leading-relaxed">{story.emojis}</div>
              <p className="text-gray-600 mb-4">{story.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <button
                  onClick={() => handleLike(story.id)}
                  className={`flex items-center space-x-1 ${
                    story.isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={story.isLiked ? 'currentColor' : 'none'} />
                  <span>{story.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-indigo-600">
                  <MessageCircle size={18} />
                  <span>{story.comments}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-indigo-600">
                  <Share2 size={18} />
                  <span>{story.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Trending Combinations
            </h2>
            <div className="space-y-4">
              {trends.map(trend => (
                <div
                  key={trend.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="text-2xl mb-1">{trend.emojis}</div>
                    <p className="text-sm text-gray-600">{trend.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Star size={16} className="text-yellow-500" />
                    <span>{trend.usageCount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Featured Creator
            </h2>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Featured Creator"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-medium text-gray-900">EmojiMaster</h3>
              <p className="text-sm text-gray-500 mb-4">Professional Story Creator</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <div>
                  <div className="font-medium">1.2K</div>
                  <div>Stories</div>
                </div>
                <div>
                  <div className="font-medium">45K</div>
                  <div>Followers</div>
                </div>
                <div>
                  <div className="font-medium">892</div>
                  <div>Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}