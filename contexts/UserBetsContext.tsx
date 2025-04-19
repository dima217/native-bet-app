// context/UserBetsContext.tsx
import React, { createContext, useContext } from 'react';
import { useUserBets } from '@/hooks/useUserBets';
import { Bet } from '@/types/types';

type UserBetsContextType = {
    bets: Bet[];
    loading: boolean;
    error: string;
    refreshBets: () => Promise<void>;
};

const UserBetsContext = createContext<UserBetsContextType | null>(null);

export const UserBetsProvider = ({ children }: { children: React.ReactNode }) => {
  const { bets, loading, error, refreshBets } = useUserBets();

  return (
    <UserBetsContext.Provider
     value={{ bets, loading, error, refreshBets }}>
      {children}
    </UserBetsContext.Provider>
  );
};

export const useUserBetsContext = () => {
  const context = useContext(UserBetsContext);
  if (!context) {
    throw new Error('useUserBetsContext must be used within a UserBetsProvider');
  }
  return context;
};
