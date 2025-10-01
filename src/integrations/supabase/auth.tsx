import { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { mockUser, mockSession } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

// Frontend-only auth - always authenticated with mock user
const AuthContext = createContext<AuthContextType>({
  user: mockUser as User,
  session: mockSession as Session,
  loading: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Always authenticated for frontend development
  const value = {
    user: mockUser as User,
    session: mockSession as Session,
    loading: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
