export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
