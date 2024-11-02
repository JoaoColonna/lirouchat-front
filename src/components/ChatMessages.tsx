import React from 'react';

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div
      id="chat-box"
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg h-full pt-16"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg max-w-lg ${
            message.sender === 'bot'
              ? 'bg-blue-100 self-start'
              : 'bg-gray-300 self-end'
          }`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;