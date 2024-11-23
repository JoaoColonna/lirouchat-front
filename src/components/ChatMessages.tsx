// src/components/ChatMessages.tsx
import React from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  text: string;
  sender: 'model' | 'user';
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg h-full">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          content={message.text}
          sender={message.sender}
        />
      ))}
    </div>
  );
};

export default ChatMessages;