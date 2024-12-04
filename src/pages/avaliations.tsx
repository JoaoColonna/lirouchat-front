import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatMessages from '../components/ChatMessages';
import ChatInputTest from '../components/ChatInputTest';
import { fetchMessages, fetchTestsConversations, createTest, answerTest } from '../services/chatService';
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
      router.replace('/avaliations?conversa_id=0');

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `
            <p>Bem-vindo! Para iniciar uma avaliação, siga as instruções:</p>
            <p>Por favor, escreva o assunto sobre o qual você gostaria que eu criasse uma avaliação. Por exemplo: Português básico, História da França, etc.</p>
            <p>Quanto mais específico, melhor, pois sou treinado para criar perguntas aleatórias sobre os temas! Vamos começar?</p>
            <p><strong>Qual será o assunto?</strong></p>
          `,
          sender: 'model',
        },
      ]);
    } else if (conversa_id && Number(conversa_id) !== 0) {
      const fetchConversation = async () => {
        try {
          const response = await fetchMessages(Number(conversa_id));
          const fetchedMessages = await Promise.all(
            response.conversation.map(async (msg: { role: string; parts: string }) => {
              const processedContent = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(msg.parts);
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
        const response = await fetchTestsConversations();
        setConversations(response.conversas);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchAllConversations();
  }, []);


  const handleSendMessage = async (conversaId: number, message: string, sender: 'model' | 'user') => {
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: processedContent.toString(), sender: sender },
    ]);

    try {
      let response;
      if (conversaId === 0) {
        response = await createTest(message);
        if (response) {
          setConversaId(response.conversa_id);
          router.push(`/avaliations?conversa_id=${response.conversa_id}`);
        }
      } else {
        response = await answerTest(conversaId, message);
        if (response) {
          const processedResponse = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(response.resposta);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: processedResponse.toString(), sender: 'model' },
          ]);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            conversations={conversations}
            onSelectConversation={(id: number) => router.push(`/avaliations?conversa_id=${id}`)}
          />
          <div className="flex flex-col flex-1">
            <ChatMessages messages={messages} />
            <ChatInputTest
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