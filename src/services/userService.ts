import { getCSRFToken } from "../store/authStore";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/chatbot';

export const createUser = async (username: string, password: string, email: string, age: number) => {
    try {
        const response = await fetch(`${apiUrl}/api/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                age: age,
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
};

export const updateUser = async (username: string, email: string, age: number) => {
    try {
        const response = await fetch(`${apiUrl}/api/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify({
                username: username,
                email: email,
                age: age,
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
    }
}