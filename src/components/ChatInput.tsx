// src/components/ChatInput.tsx
import { useState, useEffect } from 'react';
import { sendMessage } from '../services/chatService';
import showdown from 'showdown';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (conversaId: number, message: string, sender: 'model' | 'user') => void;
  conversaId: number | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, handleSendMessage, conversaId: initialConversaId }) => {
  const [conversaId, setConversaId] = useState<number>(initialConversaId ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const converter = new showdown.Converter();

  useEffect(() => {
    if (initialConversaId !== null) {
      setConversaId(initialConversaId);
    }
  }, [initialConversaId]);

  const sendMessageHandler = async () => {
    if (newMessage.trim() === '') return;

    // Adiciona a mensagem do usuário imediatamente
    handleSendMessage(conversaId, newMessage, 'user');
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessage(conversaId, newMessage);
      if (conversaId === 0) {
        setConversaId(response.data.conversa_id);
      }
      // Converte a resposta do bot de Markdown para HTML
      const htmlResponse = converter.makeHtml(response.data.resposta);
      // Adiciona a resposta do bot quando ela chegar
      handleSendMessage(response.data.conversa_id, htmlResponse, 'model');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-4 border-t border-l border-gray-100 bg-white">
      <input
        id="message-input"
        type="text"
        placeholder="Escreva sua mensagem..."
        className="flex-1 p-2 border border-gray-100 rounded-lg focus:outline-none focus:border-blue-500"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        disabled={isLoading}
      />
      <button
        id="send-button"
        className="ml-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        onClick={sendMessageHandler}
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
};

export default ChatInput;