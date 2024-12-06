import axios from 'axios';
import { TranslationResponse, TranslationRequest } from '../types/translation';

const API_URL = '/api';

export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    const response = await axios.post<TranslationResponse>(`${API_URL}/convert`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Translation failed: ${error.response?.data?.error || error.message}`);
    }
    throw new Error('Translation failed');
  }
}

export async function checkServiceHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data.status === 'ok';
  } catch {
    return false;
  }
}