import React from 'react'
import { AlertCircle } from 'lucide-react'
import { TranslationError } from '../../types/translation'

interface TranslationInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  error?: TranslationError | null
  disabled?: boolean
}

export function TranslationInput({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled
}: TranslationInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-40 px-4 py-3 rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-ocean-500 resize-none`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle size={16} />
          <span className="text-sm">{error.message}</span>
        </div>
      )}
    </div>
  )
}