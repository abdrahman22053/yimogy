import { useState } from 'react';
import { convertText } from '../services/emojiService';

export function useEmojiConversion() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await convertText(text);
      return result.converted;
    } catch (err) {
      setError('Conversion failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    convert,
    isLoading,
    error
  };
}