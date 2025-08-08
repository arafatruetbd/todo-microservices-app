// src/features/auth/types/AuthContextType.ts
export interface AuthContextType {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}
