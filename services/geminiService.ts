import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTION = `
Você é a consultora virtual especialista em design de interiores e móveis planejados da empresa "Zatti Ambientes".
Seu tom de voz é elegante, prestativo e profissional, refletindo a sofisticação da marca.
Você deve ajudar clientes com dúvidas sobre:
1. Combinação de cores e materiais (MDF, madeiras, vidros) para móveis sob medida.
2. Otimização de espaços residenciais e comerciais.
3. Tendências de decoração alinhadas ao estilo da Zatti Ambientes (Contemporâneo, Sofisticado).
4. Funcionalidade de móveis (cozinhas, guarda-roupas, home office).

Regras:
- Responda sempre em Português do Brasil.
- Seja concisa, respostas com no máximo 3 parágrafos curtos.
- Se perguntarem preços, diga que depende da personalização do projeto e sugira solicitar um orçamento no formulário do site.
- Use emojis moderadamente para parecer amigável, mas mantendo a elegância.
- Reforce que a Zatti Ambientes preza pela qualidade e acabamento impecável.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  if (!aiClient) {
    return "Desculpe, o serviço de IA não está configurado corretamente (API Key ausente).";
  }

  try {
    // We reconstruct a lightweight history for the context, though strictly 
    // for this simple implementation we might just use the messages directly if using the Chat API.
    // Here we will use the chat model.

    const chat = aiClient.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Tive um problema técnico. Por favor, tente novamente em alguns instantes.";
  }
};