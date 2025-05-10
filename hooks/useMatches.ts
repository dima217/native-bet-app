// hooks/useMatches.ts
import api from "@/api/api";
import { Match, MatchStatus } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export default function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 250;

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/matches', {
        params: { page, limit },
      });
      
      const contentRange = response.headers['content-range'];
      const totalMatches = parseInt(contentRange.split('/')[1], 10);
      setTotal(totalMatches);

      const pendingMatches = response.data.filter(
        (match: Match) => match.status === MatchStatus.NOT_STARTED
      );
      
      setMatches(pendingMatches);
    } catch (err) {
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, total, page, setPage, loading, error, refreshMatches: fetchMatches };
}