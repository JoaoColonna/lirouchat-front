import { AppProps } from 'next/app';
// import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
// import { useAuthStore } from '../store/authStore';

function MyApp({ Component, pageProps }: AppProps) {
  // const setCsrfToken = useAuthStore(state => state.setCsrfToken);

  // useEffect(() => {
  //   void setCsrfToken();
  // }, [setCsrfToken]);

  return (
    // <AuthProvider>
      <Component {...pageProps} />
    // </AuthProvider>
  );
}

export default MyApp;