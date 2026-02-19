import { ChatMessage } from "../types";

// Aqui colocamos as rédeas curtas na IA para ela não falar demais
const SYSTEM_INSTRUCTION = `
Você é a consultora virtual da Zatti Ambientes Planejados.
Seu tom é educado, sofisticado e EXTREMAMENTE DIRETO.

REGRAS OBRIGATÓRIAS:
1. NUNCA escreva parágrafos longos.
2. Suas respostas devem ter no MÁXIMO 2 ou 3 frases curtas.
3. Seja objetiva e vá direto ao ponto.
4. Se perguntarem preços, diga que projetos planejados dependem de medidas e materiais, e convide o cliente a clicar em "Orçamento".
5. Foco exclusivo em móveis planejados, MDF, design de interiores e funcionalidade.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) return "Erro: Chave API não encontrada.";

  // ATENÇÃO: Se o modelo que funcionou para você foi outro, apenas ajuste o nome aqui!
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
  
  contents.push({ role: 'user', parts: [{ text: newMessage }] });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        // No fetch direto via URL, o system_instruction deve ir dentro de system_instruction (snake_case)
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.5, 
          maxOutputTokens: 200, // 100 é muito pouco, pode cortar frases no meio
        }
      })
    });

    const data = await response.json();

    // 2. Trata o erro de limite de requisições (Quota Exceeded)
    if (response.status === 429) {
      console.error("Limite de requisições atingido.");
      return "O limite de mensagens gratuitas foi atingido. Tente novamente em 1 minuto.";
    }

    if (!response.ok) {
      throw new Error(data.error?.message || "Erro na API");
    }
    
    // 3. Verifica se a resposta existe antes de acessar
    const textoResposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textoResposta) {
      return "A IA não conseguiu gerar uma resposta para este conteúdo.";
    }

    return textoResposta;

  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao conectar com a IA. Verifique sua conexão ou a chave de API.";
  }
};