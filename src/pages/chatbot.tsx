import { useState } from 'react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { Message } from "../types/index";
import Header from '../components/Header';
// import withAuth from '../components/withAuth';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Olá! Como posso te ajudar hoje?', sender: 'bot' },
    { text: 'Gostaria de saber mais sobre o seu serviço.', sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (conversaId: number, resposta: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: 'user' },
      { text: resposta, sender: 'bot' },
    ]);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ChatMessages messages={messages} />
          </div>
        </div>
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default Chat // withAuth();