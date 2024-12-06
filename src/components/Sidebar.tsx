import React, { useState } from 'react';
import { FaUser, FaCog, FaFileDownload } from 'react-icons/fa';
import { AuthStore, useAuthStore } from '../store/authStore';
import { fetchMessages } from '../services/chatService';
import UserSettingsModal from './UserSettingsModal';
import { jsPDF } from 'jspdf';
import MarkdownPDF from 'markdown-pdf';

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

  const generatePDF = async (conversationId: number) => {
    try {
      const response = await fetchMessages(conversationId);
      const doc = new jsPDF();

      doc.setFontSize(12);
      doc.text('Conversa', 10, 10);
      const pageHeight = doc.internal.pageSize.height;
      let y = 20;

      response.conversation.forEach((msg: { role: string; parts: string }, index: number) => {
        const sender = msg.role === 'user' ? user?.username : 'Lirouchat';
        const text = `${sender}: ${msg.parts}`;
        const lines = doc.splitTextToSize(text, 180);

        lines.forEach((line: string) => {
          if (y > pageHeight - 10) {
        doc.addPage();
        y = 10;
          }
          doc.text(line, 10, y);
          y += 10;
        });
      });

      doc.save(`conversa_${conversationId}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
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
              <li key={conversation.id} className="flex justify-between items-center">
                <button
                  className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="font-semibold text-gray-800">{conversation.titulo}</div>
                  <div className="text-sm text-gray-600">{new Date(conversation.criada_em).toLocaleString()}</div>
                </button>
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => generatePDF(conversation.id)}
                >
                  <FaFileDownload />
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