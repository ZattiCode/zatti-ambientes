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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
  
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
        // Envia as regras de comportamento
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: contents,
        // Limita a criatividade e o tamanho do texto
        generationConfig: {
          temperature: 0.5, 
          maxOutputTokens: 100, // Corta a resposta fisicamente se ela tentar falar demais
        }
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Erro na API");
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro de conexão com a IA.";
  }
};