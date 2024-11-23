// src/components/ChatMessage.tsx
import React from 'react';
import DOMPurify from 'dompurify';

interface ChatMessageProps {
  content: string;
  sender: 'model' | 'user';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender }) => {
  return (
    <div className={`mb-4 ${sender === 'model' ? 'text-left' : 'text-right'}`}>
      <div className={`inline-block p-2 rounded-lg max-w-3/4 ${sender === 'model' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      </div>
    </div>
  );
};

export default ChatMessage;