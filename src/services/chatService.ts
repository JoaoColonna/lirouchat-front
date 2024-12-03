import { getCSRFToken } from "../store/authStore";
import api from "./api";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/chatbot';

export const sendMessage = async (conversaId: number, message: string) => {
    try {
        const response = await api.post(`/api/chat/send-message`, {
            conversa_id: conversaId,
            message: message,
        }, {
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
            },
            withCredentials: true,
        });

        if (!response) {
            throw new Error('Failed to send message');
        }

        return response;
    } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
    }
};

export const fetchMessages = async (conversaId: number) => {
    try {
        const response = await fetch(`${apiUrl}/api/chat/conversation/${conversaId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
        });

        if (!response.ok) {
           return false;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        throw error;
    }
};

export const fetchConversations = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/chat/conversations`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch conversations');
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch conversations:', error);
        throw error;
    }
};