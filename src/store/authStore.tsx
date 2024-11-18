import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// import { NextResponse, NextRequest } from 'next/server'
// import { getCookie, getCookies } from 'cookies-next';

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
        const response = await fetch(apiUrl + '/api/auth/set-csrf-token', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        return data.csrftoken;
      },

      login: async (username: string, password: string) => {
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
        } else {
          set({ user: null, isAuthenticated: false });
          console.log("deu não");
        }
        return data.success;
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
  /*
  We get the csrftoken from the cookeis in the user's browser.
  You can use an package here if you want nicer code, or just use the code below.
  */
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  if (cookieValue === null) {
    throw new Error('Missing CSRF cookie.');
  }
  return cookieValue;
};