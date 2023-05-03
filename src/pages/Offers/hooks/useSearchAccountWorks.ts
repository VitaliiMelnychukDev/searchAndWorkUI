import { Worker } from '../../../types/Work';
import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { AccountWork } from '../../../types/AccountWork';

type UseSearchWorkWorkers = {
  loadingAccountWorks: boolean;
  accountWorks: AccountWork[];
  errorAccountWorks: string;
}
export const useSearchAccountWorks = (id: number): UseSearchWorkWorkers => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountWorks, setaccountWorks] = useState<AccountWork[]>([]);

  const fetchAccountWorks = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const accountWorkers: AccountWork[] = await searchAndWorkClient.get(ApiUrlHelper.getSearchWorkWorkersUrl(id));
      setaccountWorks(accountWorkers);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchAccountWorks(id);
  }, [id]);


  return {
    loadingAccountWorks: loading,
    accountWorks: accountWorks,
    errorAccountWorks: error,
  }
}