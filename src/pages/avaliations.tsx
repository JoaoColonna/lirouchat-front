// src/pages/chatbot.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import { Message } from "../types/index";
import withAuth from '../components/withAuth';
import { fetchMessages, fetchConversations } from '../services/chatService';
import showdown from 'showdown';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<{ id: number; titulo: string; criada_em: string }[]>([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { conversa_id } = router.query;
  const converter = new showdown.Converter();

  useEffect(() => {
    console.log('conversa_id:', conversa_id);
    if (!conversa_id && !isRedirecting) {
      setIsRedirecting(true);
    //   router.replace('/chatbot?conversa_id=0');
    } else if (conversa_id && Number(conversa_id) !== 0) {
      const fetchConversation = async () => {
        try {
          const response = await fetchMessages(Number(conversa_id));
          const fetchedMessages = response.conversation.map((msg: any) => ({
            text: converter.makeHtml(msg.parts),
            sender: msg.role === 'user' ? 'user' : 'model',
          }));
          setMessages(fetchedMessages);
          setConversaId(Number(conversa_id));
        } catch (error) {
          console.error('Failed to fetch conversation:', error);
        }
      };
      fetchConversation();
    } else {
      setConversaId(0);
    }
  }, [conversa_id, isRedirecting]);

  useEffect(() => {
    const fetchAllConversations = async () => {
      try {
        const response = await fetchConversations();
        setConversations(response.conversas);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchAllConversations();
  }, []);

  const handleSendMessage = (conversaId: number, message: string, sender: 'model' | 'user') => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: sender },
    ]);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            conversations={conversations}
            onSelectConversation={(id: number) => router.push(`/chatbot?conversa_id=${id}`)}
          />
          <div className="flex flex-col flex-1">
            <ChatMessages messages={messages} />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              conversaId={conversaId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Chat);