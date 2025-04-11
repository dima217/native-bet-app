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
  SCHEDULED = 'pending',
  LIVE = 'in progress',
  FINISHED = 'finished',
  CANCELED = 'cancelled',
}

export enum BetStatus {
  WIN = 'win',
  LOSE = 'lose',
  DURING = 'active',
  CANCELED = 'canceled',
}

export type User = {
    id: string;
    email: string;
    username: string,
    balance: number,
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
      date: string;
    };
  };

  export type Match = {
    id: number;
    date: string;
    time: string;
    sportType: SportType;
    status: MatchStatus;
    teamA: string;
    teamB: string;
    winner: string;
  }