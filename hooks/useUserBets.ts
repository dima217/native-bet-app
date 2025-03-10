import { useCallback, useEffect, useState } from 'react';
import { Bet } from '../types/types';
import api from '../api/api';
import { useAuth } from './useAuth';
import { AxiosError } from 'axios';

export const useUserBets = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchUserBets = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/bets/my');
      setBets(response.data);
    } catch (err) {
      setError('Failed to load bets');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserBets();
  }, [fetchUserBets]);

  const placeBet = async (matchId: number, amount: number, team: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await api.post('/bets', {
        matchId,
        userId: user.id,
        amount,
        team
      });
      
      setBets(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError)
      throw new Error(err.response?.data?.message || 'Failed to place bet');
    }
  };

  const cancelBet = async (betId: number) => {
    try {
      await api.delete(`/bets/${betId}`);
      setBets(prev => prev.filter(bet => bet.id !== betId));
    } catch (err) {
       if (err instanceof AxiosError)
      throw new Error(err.response?.data?.message || 'Failed to cancel bet');
    }
  };

  return {
    bets,
    loading,
    error,
    placeBet,
    cancelBet,
    refreshBets: fetchUserBets,
  };
};