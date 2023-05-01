import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { AccountCategory } from '../../../types/AccountCategory';

type UseAccountCategory = {
  loading: boolean;
  accountCategory: AccountCategory | null;
  error: string;
}

export const useAccountCategory = (id: number): UseAccountCategory => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountCategory, setAccountCategory] = useState<AccountCategory | null>(null);

  const fetchAccountCategory = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const accountCategory: AccountCategory = await searchAndWorkClient.get(ApiUrlHelper.getAccountCategoryUrl(id));
      setAccountCategory(accountCategory);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchAccountCategory(id);
  }, [id]);


  return {
    loading,
    accountCategory,
    error,
  }
}