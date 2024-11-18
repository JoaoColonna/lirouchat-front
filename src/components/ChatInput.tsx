// import axios from 'axios';
// import api from '../services/api';
// import { useState } from 'react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (conversaId: number, message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, /*handleSendMessage*/ }) => {
  // const [conversaId, setConversaId] = useState(0);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // const cookies = document.cookie;
      // const response = await api.post('/api/chat/send-message', {
      //   conversa_id: conversaId,
      //   message: newMessage,
      // });

      // if (response.status === 200) {
      //   const { conversa_id, resposta } = response.data;
      //   setConversaId(conversa_id);
      //   handleSendMessage(conversa_id, resposta);
      //   setNewMessage('');
      // }
      fetch('http://127.0.0.1:8000/chatbot/api/chat/conversations', {
        method: 'GET',
        credentials: 'include',  // Inclui cookies na requisição
        headers: {
            'Content-Type': 'application/json',
        }
        // body: JSON.stringify({
        //     username: 'user',
        //     password: 'password'
        // })
        ,
    })
    .then(response => response.json())
    .then(data => console.log(data));

    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

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
        onClick={sendMessage}
      >
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;