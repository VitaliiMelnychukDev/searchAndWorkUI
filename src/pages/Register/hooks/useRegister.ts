import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { apiAuthPath } from '../../../constants/apiPaths';
import { Role } from '../../../constants/role';

export type RegisterProps = {
  email: string;
  phone?: string;
  password: string;
  name: string;
  cityId: number;
  address: string;
}


export type UseRegister = {
  loading:boolean;
  error: string;
  registered: boolean;
  register: (registerProps: RegisterProps) => Promise<void>;
}
export const useRegister = (): UseRegister => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = async (registerProps: RegisterProps): Promise<void> => {
    setLoading(true);
    setError('');
    setRegistered(false);
    try {
      await searchAndWorkClient.post(apiAuthPath.register, {
        ...registerProps,
        role: Role.user
      });
      setLoading(false);
      setRegistered(true);
    } catch (e: any) {
      setLoading(false);
      setError(e.message)
    }
  }

  return {
    registered,
    loading,
    error,
    register
  }
}