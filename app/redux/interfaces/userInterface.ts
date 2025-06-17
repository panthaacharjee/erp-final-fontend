export interface User {
  id: string;
  name: string;
  email: string;
  role:string;
  userName:string;
}

export interface UserState {
  isAuthenticated: boolean;
  status: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
  success: string | null;
}