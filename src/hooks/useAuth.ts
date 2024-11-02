import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Lógica de autenticação
    }, []);

    return isAuthenticated;
}

export default useAuth;