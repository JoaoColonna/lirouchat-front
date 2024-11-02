import React from 'react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className="flex p-4 border-t border-gray-100 bg-white">
      <input
        id="message-input"
        type="text"
        placeholder="Escreva sua mensagem..."
        className="flex-1 p-2 border border-gray-100 rounded-lg focus:outline-none focus:border-blue-500"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        id="send-button"
        className="ml-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        onClick={handleSendMessage}
      >
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;