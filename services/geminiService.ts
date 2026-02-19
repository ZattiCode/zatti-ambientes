import { GoogleGenerativeAI } from "@google/generative-ai";
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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "Desculpe, o serviço de IA não está configurado corretamente (API Key ausente).";
  }

  try {
    // Inicializa a biblioteca correta
    const genAI = new GoogleGenerativeAI(apiKey);

    // Configura o modelo de IA e as instruções do sistema
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash', 
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Prepara o histórico da conversa no formato exigido
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });

    // Envia a nova mensagem e aguarda a resposta
    const result = await chat.sendMessage(newMessage);
    const response = result.response;
    
    return response.text() || "Desculpe, não consegui processar sua resposta.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Tive um problema técnico momentâneo. Por favor, tente novamente.";
  }
};