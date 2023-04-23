import { Role } from '../constants/role';

export type User = {
  name: string;
  email: string;
  role: Role;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = Tokens & {
  user: User;
}