import { useState, useEffect } from 'react';

interface ChatInputProps {

    newMessage: string;
  
    setNewMessage: (message: string) => void;
  
    handleSendMessage: (conversaId: number, message: string, sender: 'model' | 'user') => Promise<void>;
  
    conversaId: number | null;
  
  }

const ChatInputTest: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, handleSendMessage, conversaId: initialConversaId }) => {
  const [conversaId, setConversaId] = useState<number>(initialConversaId ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialConversaId !== null) {
      setConversaId(initialConversaId);
    }
  }, [initialConversaId]);

  const sendMessageHandler = async () => {
    if (newMessage.trim() === '') return;

    setIsLoading(true);
    try {
      await handleSendMessage(conversaId, newMessage, 'user');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
      setNewMessage('');
    }
  };

  return (
    <div className="flex p-4 border-t border-l border-gray-100 bg-white">
      <textarea
      id="message-input"
      placeholder="Escreva sua mensagem..."
      className="flex-1 p-2 border border-gray-100 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageHandler();
        }
      }}
      disabled={isLoading}
      rows={1}
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

export default ChatInputTest;