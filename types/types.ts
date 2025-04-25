export enum SportType {
  DOTA2 = 'dota2',
  COUNTER_STRIKE = 'counter-strike',
  LOL = 'league-of-legends',
  VALORANT = 'valorant',
  OVERWATCH = 'overwatch',
}

export enum UserRole {
  USER = 'user',
  BANNED = 'banned',
  ADMIN = 'admin',
}

export enum MatchStatus {
  NOT_STARTED = 'not_started',
  RUNNING = 'running',
  FINISHED = 'finished',
  CANCELED = 'canceled',
}

export enum BetStatus {
  WIN = 'win',
  LOSE = 'lose',
  DURING = 'during',
  CANCELED = 'canceled',
}

export type User = {
    id: string;
    email: string;
    username: string,
    balance: number,
    avatarUrl?: string | null,
    role: UserRole;
  };

  export type Bet = {
    id: number;
    amount: number;
    team: string;
    status: BetStatus;
    match: {
      id: number;
      teamA: string;
      teamB: string;
      beginAt: string;
      league: string;
      sportType: SportType;
    };
  };

  export type Match = {
    id: number;
    beginAt: Date;
    time: string;
    sportType: SportType;
    status: MatchStatus;
    teamA: string;
    teamB: string;
    league: string;
    teamAImage?: string; 
    teamBImage?: string; 
    winner: string;
  }