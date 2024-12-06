"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsEmoji = containsEmoji;
exports.createPrompt = createPrompt;
function containsEmoji(text) {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
}
function createPrompt(text, hasEmojis) {
    if (hasEmojis) {
        return `Décris ces emojis en mots simples, garde le même sens : "${text}". 
            Réponds uniquement avec la description, sans autre texte.`;
    }
    return `Convertis ce texte en emojis appropriés : "${text}". 
          Réponds uniquement avec les emojis, sans autre texte.`;
}
