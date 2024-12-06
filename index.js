import express from 'express';
import cors from 'cors';
import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: "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",
});

// Fonction pour détecter si une chaîne contient des emojis
function containsEmoji(text) {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(text);
}

// Fonction pour créer le prompt approprié
function createPrompt(text, hasEmojis) {
  if (hasEmojis) {
    return `Décris ces emojis en mots simples, garde le même sens : "${text}". 
            Réponds uniquement avec la description, sans autre texte.`;
  }
  return `Convertis ce texte en emojis appropriés : "${text}". 
          Réponds uniquement avec les emojis, sans autre texte.`;
}

// Route unique de conversion automatique
app.post('/api/convert', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Texte requis' });
    }

    const hasEmojis = containsEmoji(text);
    
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: createPrompt(text, hasEmojis)
      }],
      temperature: 0.7
    });

    res.json({
      original: text,
      converted: message.content[0].text,
      type: hasEmojis ? 'emoji-to-text' : 'text-to-emoji',
      status: 'success'
    });

  } catch (error) {
    console.error('Erreur de conversion:', error);
    res.status(500).json({
      error: 'Échec de la conversion',
      details: error.message
    });
  }
});

// Endpoint de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Service opérationnel' });
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue!',
    details: err.message
  });
});

app.listen(port, () => {
  console.log(`Service de conversion emoji lancé sur le port ${port}`);
});

// Export for testing/importing
export default app;
