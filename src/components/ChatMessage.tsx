// src/components/ChatMessage.tsx
import React from 'react';
import DOMPurify from 'dompurify';
import { FaVolumeUp } from 'react-icons/fa';

interface ChatMessageProps {
  content: string;
  sender: 'model' | 'user';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender }) => {
  const speakMessage = (message: string) => {
    console.log('Speaking message:', message);
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.2;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const sanitizedContent = new DOMParser().parseFromString(content, 'text/html').body.textContent || '';

  return (
    <div className={`mb-4 ${sender === 'model' ? 'text-left' : 'text-right'}`}>
      <div className={`inline-block p-2 rounded-lg max-w-3/4 ${sender === 'model' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
        {sender === 'model' && (
          <button
            onClick={() => speakMessage(sanitizedContent)}
            className="ml-2 text-gray-600 hover:text-gray-800"
            aria-label="Ouvir mensagem"
          >
            <FaVolumeUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;