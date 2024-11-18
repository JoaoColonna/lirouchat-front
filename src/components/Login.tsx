import { useState } from 'react';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';
// import { useRouter } from 'next/router';
// import { setCookie } from 'cookies-next';
import { useAuthStore } from '../store/authStore';
import { redirect } from 'next/navigation';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [/*error*/, setError] = useState('');
  const login = useAuthStore(state => state.login);
  // const navigate = navigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      redirect('/');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };
  
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = JSON.stringify({
  //     username: username,
  //     password: password,
  //   });
    
  //   const response = await api.post('/api/auth/login', data);
  //   if (response.status === 200) {
  //     setCookie('sessionid', null);
  //     login();
  //     router.push('/chatbot');
  //   } else {
  //     console.log('Login failed:', response.data);
  //   }
  //   // .then(response => {
  //   //   console.log('Login successful:', response.data);
  //   //   login();
  //   // }).catch(error => {
  //   //   console.error('Login failed:', error);
  //   //   // setError('Login failed. Please check your credentials and try again.');
  //   // });
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
            Email ou Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-complementary text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-complementary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;