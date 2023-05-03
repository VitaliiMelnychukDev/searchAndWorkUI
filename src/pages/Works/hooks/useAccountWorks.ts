import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { accountWorkPaths } from '../../../constants/apiPaths';
import { AccountWork } from '../../../types/AccountWork';

type UseAccountWorksProps = {
  loading: boolean;
  error: string;
  works: AccountWork[];
}
export const useAccountWorks = (): UseAccountWorksProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [works, setWorks] = useState<AccountWork[]>([]);

  const fetchWorks = async () => {
    setLoading(true);
    const worksUrl = ApiUrlHelper.buildUrlWithParams(accountWorkPaths.getAccountWorks, {
      'limit': 1000,
    })

    try {
      const accountWorks: AccountWork[] = await searchAndWorkClient.get(worksUrl);
      setWorks(accountWorks);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
      fetchWorks()
  }, []);


  return {
    loading,
    error,
    works
  }
}