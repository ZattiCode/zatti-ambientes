import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Bem-vindo à Zatti Ambientes. Sou sua consultora de design virtual. Como posso ajudar a planejar seu espaço hoje?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Filter out the welcome message if it's not a real API turn (optional, but cleaner)
      const historyForApi = messages.filter(m => m.id !== 'welcome');
      
      const responseText = await sendMessageToGemini(historyForApi, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`ai-fab ${isOpen ? 'open' : 'closed'}`}
        aria-label="Abrir consultor de design"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-window">
          
          {/* Header */}
          <div className="ai-header">
            <div className="ai-icon-bg">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold">Zatti IA</h3>
              <p className="text-sm opacity-75">Consultora de Design</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="ai-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message-row ${msg.role}`}
              >
                <div className={`ai-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-message-row model">
                <div className="ai-bubble model" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={16} className="text-accent" style={{ animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '0.75rem', color: '#78716c' }}>Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="ai-input-area">
            <div className="ai-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ex: Qual cor combina com madeira?"
                className="ai-input"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="ai-send-btn"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="ai-disclaimer">
              <p>IA pode cometer erros. Verifique informações importantes.</p>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default AIConsultant;