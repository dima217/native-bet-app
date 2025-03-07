import api from "@/api/api";
import { Match } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export default function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/matches');
      setMatches(response.data);
    } catch (err) {
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refreshMatches: fetchMatches };
}