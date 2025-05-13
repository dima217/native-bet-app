import api from "@/api/api";
import { Match, MatchStatus } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export default function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/matches/all');
    
      const pendingMatches = response.data.filter(
        (match: Match) => match.status === MatchStatus.NOT_STARTED
      );
      
      setMatches(pendingMatches);
    } catch (err: unknown) {
      if (err instanceof Error)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refreshMatches: fetchMatches };
}
