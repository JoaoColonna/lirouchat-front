import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCookie } from 'cookies-next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/chatbot';
export interface AuthStore {

  isAuthenticated: boolean;

  user: { username: string; secret_fact: string } | null;

  logout: () => Promise<void>;

  fetchUser: () => Promise<void>;

  login: (username: string, password: string) => Promise<boolean>;
  
  setCsrfToken: () => Promise<string>;

}



export const useAuthStore = create<AuthStore, [["zustand/persist", unknown]]>(
  
  persist(
    (set, get: () => AuthStore) => ({
      user: null,
      isAuthenticated: false,

      setCsrfToken: async () => {
        try {
          const response = await fetch(apiUrl + '/api/auth/set-csrf-token', {
            method: 'GET',
            credentials: 'include'
          });
          const data = await response.json();
          return data.csrftoken;
        } catch (error) {
          console.error('Failed to set CSRF token', error);
          throw error;
        }
      },

      login: async (username: string, password: string) => {
        try {
          const csrftoken = await get().setCsrfToken();
          const response = await fetch(apiUrl + '/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
          });
          const data = await response.json();
          console.log(data);
          if (data.status == "success") {
            set({ isAuthenticated: true });
            get().fetchUser();
            return true;
          } else {
            set({ user: null, isAuthenticated: false });
            console.log("deu não");
            return false;
          }
          return data.success;
        } catch (error) {
          console.error('Login failed', error);
          set({ user: null, isAuthenticated: false });
          return false;
        }
      },

      logout: async () => {
        try {
          const csrftoken = await get().setCsrfToken();
          const response = await fetch(apiUrl + '/api/auth/logout', {
            method: 'POST',
            headers: {
              'X-CSRFToken': csrftoken
            },
            credentials: 'include'
          });
          if (response.ok) {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Logout failed', error);
          throw error;
        }
      },

      fetchUser: async () => {
        try {
          const csrftoken = await get().setCsrfToken();
          const response = await fetch(apiUrl + '/api/auth/user', {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
          });
          if (response.ok) {
            const data = await response.json();
            set({ user: data, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Failed to fetch user', error);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);



export const getCSRFToken = () => {
  const cookieValue = getCookie('csrftoken');
  if (!cookieValue) {
    console.log('Missing CSRF cookie.');
  }
  return cookieValue as string;
};
