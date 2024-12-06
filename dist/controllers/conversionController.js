"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertText = convertText;
exports.healthCheck = healthCheck;
const sdk_1 = require("@anthropic-ai/sdk");
const emojiDetector_1 = require("../utils/emojiDetector");
const anthropic = new sdk_1.Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
async function convertText(req, res) {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Texte requis' });
        }
        const hasEmojis = (0, emojiDetector_1.containsEmoji)(text);
        const message = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            messages: [{
                    role: 'user',
                    content: (0, emojiDetector_1.createPrompt)(text, hasEmojis)
                }],
            temperature: 0.7
        });
        res.json({
            original: text,
            converted: message.content[0].text,
            type: hasEmojis ? 'emoji-to-text' : 'text-to-emoji',
            status: 'success'
        });
    }
    catch (error) {
        console.error('Erreur de conversion:', error);
        res.status(500).json({
            error: 'Échec de la conversion',
            details: error.message
        });
    }
}
function healthCheck(req, res) {
    res.json({ status: 'ok', message: 'Service opérationnel' });
}
