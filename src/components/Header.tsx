import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <header className="static bg-background top-0 left-0 w-full py-2 px-3 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-200">LirouChat</div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-analogous1 text-primary-foreground hover:bg-analogous1/90 py-1.5 px-2 h-fit font-normal"
            href="/"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-analogous2 text-primary-foreground hover:bg-analogous2/90 py-1.5 px-2 h-fit font-normal"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-analogous2 text-primary-foreground hover:bg-analogous2/90 py-1.5 px-2 h-fit font-normal"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;