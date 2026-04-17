import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 inicializar sesión
  useEffect(() => {
    const savedToken = localStorage.getItem('jwt');

    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);

        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp > now) {
          setToken(savedToken);
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('jwt');
        }

      } catch (err) {
        localStorage.removeItem('jwt');
      }
    }
  }, []);

  const login = (jwt) => {
    localStorage.setItem('jwt', jwt);

    const decoded = jwtDecode(jwt);

    setToken(jwt);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwt');

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};