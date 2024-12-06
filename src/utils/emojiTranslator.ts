const emojiMap: Record<string, string> = {
  'hello': '👋',
  'love': '❤️',
  'happy': '😊',
  'sad': '😢',
  'beach': '🏖️',
  'friends': '👬',
  // Add more mappings as needed
}

export function translateToEmojis(text: string): string {
  const words = text.toLowerCase().split(' ')
  return words
    .map(word => emojiMap[word] || word)
    .filter(item => item !== '')
    .join(' ')
}