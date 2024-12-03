import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {remark} from 'remark'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import html from 'remark-html';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { fetchMessages, fetchConversations } from '../services/chatService';
import { Message } from '../types/index';
import withAuth from '../components/withAuth';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<{ id: number; titulo: string; criada_em: string }[]>([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { conversa_id } = router.query;

  useEffect(() => {
    if (!conversa_id && !isRedirecting) {
      setIsRedirecting(true);
      router.replace('/chatbot?conversa_id=0');
    } else if (conversa_id && Number(conversa_id) !== 0) {
      const fetchConversation = async () => {
        try {
          const response = await fetchMessages(Number(conversa_id));
          const fetchedMessages = await Promise.all(
            response.conversation.map(async (msg: { role: string; parts: string }) => {
                const processedContent = await remark().use(remarkGfm).use(remarkParse).use(html).process(msg.parts);
              return {
                text: processedContent.toString(),
                sender: msg.role === 'user' ? 'user' : 'model',
              };
            })
          );
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
  }, [conversa_id, isRedirecting, router]);

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

  const handleSendMessage = async (conversaId: number, message: string, sender: 'model' | 'user') => {
    const processedContent = await remark().use(remarkGfm).use(remarkParse).use(html).process(message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: processedContent.toString(), sender: sender },
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