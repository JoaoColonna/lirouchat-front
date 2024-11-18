import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthStore, AuthStore } from '../store/authStore';
import { redirect } from 'next/navigation'

export default function Home() {
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore() as AuthStore;
  // const navigate = useNavigate();

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await logout();
      redirect('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
  //     <h1 className="text-4xl font-bold">Home Page</h1>
  //     <Link href="/login" className="mt-4 text-blue-500">Go to Login</Link>
  //   </div>
  // );
  return (
    <div className="2">
      <h1>Welcome to the home page</h1>
      {isAuthenticated ? (
        <div>
          <p>Hi there {user?.username}!</p>
          <p>You are logged in.</p>
          <p>{user?.secret_fact}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="flex flex-col">
          You are not logged in.
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </p>
      )}
    </div>
  );
}