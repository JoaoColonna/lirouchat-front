// pages/login.js
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';
import { headers } from 'next/headers';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = JSON.stringify({
      username: username,
      password: password,
    });
    // try {
    //   const response = await api.post('/api/auth/login', {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json",
    //     },
    //     data
    //   })
    //   ;
    //   console.log('Login successful:', response.data);
    //   // Redirecionar ou realizar outras ações após o login bem-sucedido
    // } catch (error) {
    //   console.error('Login failed:', error);
    //   setError('Login failed. Please check your credentials and try again.');
    // }
  
    api.post('/api/auth/login', data)
    .then(response => {
      console.log('Login successful:', response.data);
    }).catch(error => {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    });
  };

  return (
    <>
      <div className="bg-gray-light flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">LirouChat</h2>
          <div>
            <div></div>
            <div></div>
          </div>
          <form onSubmit={handleSubmit}>
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
                className="text-gray-300 text-sm font-medium mb-2 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
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
      </div>
    </>
  );
}