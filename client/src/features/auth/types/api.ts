// src/features/auth/types/api.ts
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
