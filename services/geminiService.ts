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
  // Pega a chave do seu arquivo .env
  const apiKey = "AIzaSyAyp1JKlAd206hirBHmfU9nr8pwZfnyAzU";

  if (!apiKey) {
    return "Desculpe, a chave da API não foi encontrada.";
  }

  // URL direta da API do Google (não precisa de bibliotecas NPM)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Formata o histórico de mensagens para a API
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Adiciona a mensagem atual que o usuário acabou de digitar
  contents.push({
    role: 'user',
    parts: [{ text: newMessage }]
  });

  try {
    // Faz a requisição direta usando o fetch nativo do navegador
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro da API:", errorData);
      throw new Error("Falha na comunicação direta");
    }

    const data = await response.json();
    
    // Extrai a resposta da IA do JSON retornado
    const textoResposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return textoResposta || "Desculpe, não consegui formular uma resposta.";
    
  } catch (error) {
    console.error("Erro no fetch:", error);
    return "Tive um problema técnico momentâneo. Por favor, tente novamente.";
  }
};