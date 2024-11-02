import Header from '../components/Header';
import Login from '../components/Login';
import Head from 'next/head';

export default function LoginPage() {
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