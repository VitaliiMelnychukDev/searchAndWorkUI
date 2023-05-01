import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { AccountHour } from '../../../types/AccountHour';

type UseAccountHour = {
  loading: boolean;
  accountHour: AccountHour | null;
  error: string;
}

export const useAccountHour = (id: number): UseAccountHour => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountHour, setAccountHour] = useState<AccountHour | null>(null);

  const fetchAccountHour = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const accountHour: AccountHour = await searchAndWorkClient.get(ApiUrlHelper.getAccountHourUrl(id));
      setAccountHour(accountHour);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchAccountHour(id);
  }, [id]);


  return {
    loading,
    accountHour,
    error,
  }
}