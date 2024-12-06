import { useState, useCallback } from 'react';
import { translateText } from '../services/translationService';
import { TranslationResult, TranslationError } from '../types/translation';
import { useTranslationFallback } from './useTranslationFallback';

export function useTranslationService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TranslationError | null>(null);
  const { getFallbackTranslation } = useTranslationFallback();

  const translate = useCallback(async (text: string): Promise<TranslationResult | null> => {
    if (!text.trim()) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await translateText({ text });
      return {
        text: response.converted,
        type: response.type
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Translation failed');
      setError({ message: error.message });
      
      // Use fallback translation when API fails
      return getFallbackTranslation(text);
    } finally {
      setIsLoading(false);
    }
  }, [getFallbackTranslation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    translate,
    isLoading,
    error,
    clearError
  };
}