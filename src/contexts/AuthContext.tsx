import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, getCookies, deleteCookie } from 'cookies-next';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      console.log(getCookies());
      console.log(getCookie('sessionid'));
    const sessionid = getCookie('sessionid');
    const csrftoken = getCookie('csrftoken');
    if (csrftoken && sessionid) {
      console.log('User is authenticated');
      setIsAuthenticated(true);
    } else {
      console.log('User is not authenticated');
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    deleteCookie('sessionid');
    deleteCookie('csrftoken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    console.log(useContext(AuthContext));
    console.log("entrou no use Auth");
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};