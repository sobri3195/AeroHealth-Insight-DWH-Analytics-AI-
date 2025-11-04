export type UserRole =
  | 'LEADERSHIP'
  | 'UNIT_HEAD'
  | 'ANALYST_QUALITY'
  | 'ANALYST_FINANCE'
  | 'EPIDEMIOLOGIST'
  | 'AUDITOR'
  | 'DATA_STEWARD';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  facilities: string[];
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
  mfaCode?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  requiresMFA?: boolean;
}
