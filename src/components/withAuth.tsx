import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!isAuthenticated) {
          router.replace('/login');
        }
      }, 500);

      return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;