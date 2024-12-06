import React from 'react'
import { Clock, Trash2 } from 'lucide-react'
import { useTranslationHistory } from '../../hooks/useTranslationHistory'

export function TranslationHistory() {
  const { history, clearHistory, removeFromHistory } = useTranslationHistory()

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No translation history yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="relative group border border-gray-200 rounded-lg p-3 hover:border-indigo-200 transition-colors"
            >
              <div className="text-sm text-gray-500 mb-1">{item.type}</div>
              <div className="text-gray-900">{item.input}</div>
              <div className="text-indigo-600 mt-1">{item.output}</div>
              <button
                onClick={() => removeFromHistory(index)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}