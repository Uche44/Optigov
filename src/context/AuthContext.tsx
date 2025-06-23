import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'citizen' | 'company' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'citizen' | 'company' | 'admin', name?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsedUser = JSON.parse(saved);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email: string, role: 'citizen' | 'company' | 'admin', name?: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: name || email.split('@')[0] || 'User',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};