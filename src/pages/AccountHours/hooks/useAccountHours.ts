import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { apiAccountHoursPath } from '../../../constants/apiPaths';
import { AccountHour } from '../../../types/AccountHour';

type UseAccountHoursProps = {
  loading: boolean;
  error: string;
  accountHours: AccountHour[];
}
export const useAccountHours = (): UseAccountHoursProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accountHours, setAccountHours] = useState<AccountHour[]>([]);

  const fetchAccountHours = async () => {
    setLoading(true);
    const accountHoursUrl = ApiUrlHelper.buildUrlWithParams(apiAccountHoursPath.getAll, {
      'limit': 1000,
    })

    try {
      const accountHoursResponse: AccountHour[] = await searchAndWorkClient.get(accountHoursUrl);
      setAccountHours(accountHoursResponse);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccountHours()
  }, []);


  return {
    loading,
    error,
    accountHours
  }
}