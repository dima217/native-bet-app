import { format } from "date-fns";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'd MMM HH:mm'); 
};

export function timeUntil(startTime: Date): string {
    const matchTime = startTime.getTime();
    const now = Date.now();
    const diff = matchTime - now;
  
    if (diff <= 0) return 'Live';
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600) % 24;
    const days = Math.floor(seconds / 86400);
  
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
}
  
  