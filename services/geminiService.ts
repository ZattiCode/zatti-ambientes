import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Você é a consultora virtual da Zatti Ambientes.
Seu tom é sofisticado, porém extremamente direto e breve.

REGRAS RIGOROSAS:
1. RESPOSTAS CURTAS: No máximo 2 a 3 frases curtas (aprox. 40 palavras).
2. Nunca escreva parágrafos longos. Vá direto ao ponto.
3. Se perguntarem preços, diga que depende do projeto e sugira clicar em "Orçamento".
4. Foco: Combinação de cores, materiais (MDF, pedras) e funcionalidade.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
<<<<<<< HEAD
  // Correção 1: Usando import.meta.env para ler a chave no Vite
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
=======
  // A API Key deve estar configurada no ambiente (arquivo .env ou variáveis de sistema)
  if (!process.env.API_KEY) {
>>>>>>> 4a6aba5e4f187fb64fbe6163c67b67abf3dc92ea
    return "Desculpe, o serviço de IA não está configurado corretamente (API Key ausente).";
  }

  try {
<<<<<<< HEAD
    const aiClient = new GoogleGenAI({ apiKey: apiKey });
=======
    const aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
>>>>>>> 4a6aba5e4f187fb64fbe6163c67b67abf3dc92ea

    const chat = aiClient.chats.create({
      // Correção 2: Utilizando um modelo válido e rápido para chat
      model: 'gemini-2.0-flash', 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
<<<<<<< HEAD
        maxOutputTokens: 150, 
=======
        maxOutputTokens: 150, // Força a resposta a ser curta fisicamente
>>>>>>> 4a6aba5e4f187fb64fbe6163c67b67abf3dc92ea
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, não consegui processar sua resposta.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Tive um problema técnico momentâneo. Por favor, tente novamente.";
  }
};