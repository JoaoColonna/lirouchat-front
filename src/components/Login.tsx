import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/router';
import { createUser } from '../services/userService';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [, setError] = useState('');
  const login = useAuthStore(state => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (activeTab === 'login') {
      const success = await login(username, password);
      if (success) {
        console.log('loguei');
        router.push('/chatbot');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } else {
      const success = await createUser(username, password, email, parseInt(age));
      if (success) {
        console.log('cadastrado');
        const success = await login(username, password);
        if (success) {
          console.log('loguei');
          router.push('/chatbot');
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="flex space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === 'login'
              ? 'bg-complementary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === 'signup'
              ? 'bg-divide text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Cadastro
        </button>
      </div>
      <div className="flex w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit}
          className={`w-full p-6 ${
            activeTab === 'login' ? 'block' : 'hidden'
          } transition-all`}
        >
          <h2 className="text-lg font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-complementary text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-complementary"
          >
            Entrar
          </button>
        </form>

        <form
          onSubmit={handleSubmit}
          className={`w-full p-6 ${
            activeTab === 'signup' ? 'block' : 'hidden'
          } transition-all`}
        >
          <h2 className="text-lg font-semibold mb-4">Cadastro</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-complementary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="age" className="block text-gray-700 text-sm font-medium mb-2">
              Idade
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-divide"
              min={7}
              max={99}
              maxLength={2}
            />  
          </div>
          <button
            type="submit"
            className="w-full bg-divide text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-divide"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;