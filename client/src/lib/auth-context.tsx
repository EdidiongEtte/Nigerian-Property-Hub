import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  type: 'buyer' | 'renter' | 'landlord' | 'agent';
};

interface AuthContextType {
  user: User | null;
  savedPropertyIds: string[];
  login: (user: User) => void;
  logout: () => void;
  toggleSaveProperty: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Try to load from localStorage or default
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('naijahomes_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('naijahomes_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('naijahomes_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('naijahomes_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('naijahomes_saved', JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <AuthContext.Provider value={{ user, savedPropertyIds, login, logout, toggleSaveProperty }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
