import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

interface ConversionResponse {
  original: string
  converted: string
  type: 'emoji-to-text' | 'text-to-emoji'
  status: string
}

export async function convertText(text: string): Promise<ConversionResponse> {
  try {
    const response = await axios.post<ConversionResponse>(`${API_URL}/convert`, { text })
    return response.data
  } catch (error) {
    throw new Error('Failed to convert text')
  }
}

export async function checkHealth(): Promise<{ status: string; message: string }> {
  try {
    const response = await axios.get(`${API_URL}/health`)
    return response.data
  } catch (error) {
    throw new Error('Service health check failed')
  }
}