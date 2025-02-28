import { useEffect, useState, useCallback } from 'react';
import { Match } from '../types/types';
import api from '../api/api';

export default function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMatches = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/matches');
      setMatches(response.data);
    } catch (err) {
      setError('Match loading error!');
    } finally {
      setLoading(false);
    }
  };

  const refreshMatches = useCallback(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, loading, error, refreshMatches };
}
