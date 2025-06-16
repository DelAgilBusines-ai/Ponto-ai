import React, { useState } from 'react';
import { fetchAIResponse } from '@/services/aiService';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { user: userMessage, bot: '...' }]);

    try {
      const botResponse = await fetchAIResponse(userMessage);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: botResponse } : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: 'Erro ao obter resposta.' } : msg
        )
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <h2 className="text-lg font-bold mb-2">Chatbot</h2>
      <div className="overflow-y-auto h-48 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-blue-500">Você: {msg.user}</p>
            <p className="text-gray-700">Bot: {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Enviar
      </button>
    </div>
  );
};

export default Chatbot;
