import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { apiAccountCategoriesPath } from '../../../constants/apiPaths';
import { AccountCategory } from '../../../types/AccountCategory';

type UseAccountCategoriesProps = {
  loading: boolean;
  error: string;
  accountCategories: AccountCategory[];
}
export const useAccountCategories = (): UseAccountCategoriesProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountCategories, setAccountCategories] = useState<AccountCategory[]>([]);

  const fetchAccountCategories = async () => {
    setLoading(true);
    const accountCategoriesUrl = ApiUrlHelper.buildUrlWithParams(apiAccountCategoriesPath.getAll, {
      'limit': 1000,
    })

    try {
      const accountCategoriesResponse: AccountCategory[] = await searchAndWorkClient.get(accountCategoriesUrl);
      setAccountCategories(accountCategoriesResponse);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccountCategories()
  }, []);


  return {
    loading,
    error,
    accountCategories
  }
}