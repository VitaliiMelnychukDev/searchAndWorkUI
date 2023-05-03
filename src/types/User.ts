import { Role } from '../constants/role';
import { AccountCategory } from './AccountCategory';

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

export type Account = User & {
  id: number;
  phone?: number;
  address: string;
  workCategories: AccountCategory[];
}