import React, { useState, useEffect } from 'react';
import { AuthStore, useAuthStore, } from '../store/authStore';
import { updateUser } from '../services/userService';


interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({ isOpen, onClose }) => {
    const { user } = useAuthStore() as AuthStore;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedUsername = user?.username || '';
      const storedEmail = user?.email || '';
      const storedAge = user?.age || '';
      setUsername(storedUsername);
      setEmail(storedEmail);
      setAge(storedAge);
    }
  }, [isOpen]);

  const handleSave = () => {
    updateUser(username, email, parseInt(age));
    useAuthStore.getState().fetchUser();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Configurações do Usuário</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 text-sm font-medium mb-2">
            Idade
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;