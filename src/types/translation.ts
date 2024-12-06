export interface TranslationRequest {
  text: string
}

export interface TranslationResponse {
  original: string
  converted: string
  type: 'emoji-to-text' | 'text-to-emoji'
  status: string
}

export interface TranslationError {
  message: string
  code?: string
}

export interface TranslationResult {
  text: string
  type: 'emoji-to-text' | 'text-to-emoji'
}