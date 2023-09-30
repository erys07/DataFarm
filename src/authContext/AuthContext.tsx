import React, { createContext, useContext, useState } from 'react';
import { login } from '../validators/api';

type AuthContextType = {
  token: string | null;
  authenticate: (email: string, password: string) => Promise<boolean>;
  setAuthToken: (newToken: string) => void;
  removeAuthToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const authenticate = async (email: string, password: string): Promise<boolean> => {
    try {
      const newToken = await login(email, password);
      
      if(newToken) {
        setAuthToken(newToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      return false;
    }
  };

  const setAuthToken = (newToken: string) => {
    setToken(newToken); 
  };

  const removeAuthToken = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        setAuthToken,
        removeAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};
