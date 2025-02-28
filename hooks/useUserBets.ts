import { useCallback, useEffect, useState } from 'react';
import { Bet } from '../types/types';
import api from '../api/api';

export default function useUserBets() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserBets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/bets/my');
      setBets(response.data);
    } catch (err) {
      setError('Loading bets error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBets();
  }, []);

  const placeBet = async (matchId: number, amount: number) => {
    try {
      const response = await api.post('/bets', { matchId, amount });
      setBets((prev) => [...prev, response.data]);
    } catch (err) {
      throw new Error('Adding bet error');
    }
  };

  const cancelBet = async (betId: number) => {
    try {
      await api.delete(`/bets/${betId}`);
      setBets((prev) => prev.filter((bet) => bet.id !== betId));
    } catch (err) {
      throw new Error('Error canceling bet');
    }
  };

  const refreshBets = useCallback(() => {
    fetchUserBets();
  }, []);

  return {
    bets,
    loading,
    error,
    placeBet,
    cancelBet,
    refreshBets,
  };
}
