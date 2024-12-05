// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { FaUser, FaCog } from 'react-icons/fa';
import { AuthStore, useAuthStore } from '../store/authStore';
import UserSettingsModal from './UserSettingsModal';

interface SidebarProps {
  conversations: { id: number; titulo: string; criada_em: string }[];
  onSelectConversation: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ conversations = [], onSelectConversation }) => {
  const { user } = useAuthStore() as AuthStore;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col h-full">
            <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => {
              const currentPath = window.location.pathname;
              if (currentPath === '/chatbot') {
              window.location.href = currentPath;
              } else if (currentPath === '/avaliations') {
              window.location.href = currentPath;
              }
               
            }}
            >
            Novo chat
            </button>
            <div className="flex flex-row justify-center gap-2 mt-2 mb-4">
            <div className="dark:text-gray-300">{conversations.length} chats</div>
            </div>
          <ul className="space-y-2">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="font-semibold text-gray-800">{conversation.titulo}</div>
                  <div className="text-sm text-gray-600">{new Date(conversation.criada_em).toLocaleString()}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaUser className="text-gray-600" />
            <span className="ml-2 font-semibold text-gray-800">{user?.username}</span>
          </div>
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleSettingsClick}
          >
            <FaCog />
          </button>
        </div>
      </div>
      <UserSettingsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Sidebar;