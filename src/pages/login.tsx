import Header from '../components/Header';
import Login from '../components/Login';
import { useState } from 'react';
import Head from 'next/head';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return (
    <>
      <Head>
        <title>Login - LirouChat</title>
      </Head>
      {/* <div className="bg-gray-light flex flex-col items-center justify-center min-h-screen"> */}
        <Header />
            {/* <div className="mb-4"> */}
              <Login />
            {/* </div> */}
      {/* </div> */}
    </>
  );
}