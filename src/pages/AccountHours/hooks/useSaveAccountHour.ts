import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { apiGeneralPath } from '../../../constants/apiPaths';
import { AccountHour, AccountHourType } from '../../../types/AccountHour';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

export type AccountHourPropsToSave = Pick<AccountHour,  'startTime' | 'endTime' > & {
  id?: number
};

type UseSaveAccountHour = {
  loading: boolean;
  error: string;
  saved: boolean;
  save: (accountHourProps: AccountHourPropsToSave) => Promise<void>;
}

export const useSaveAccountHour = (): UseSaveAccountHour => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const save = async (accountHourProps: AccountHourPropsToSave): Promise<void> => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const propsToSave = {
        ...accountHourProps,
        type: AccountHourType.Available
      }
      if (propsToSave.id) {
        await searchAndWorkClient.put(ApiUrlHelper.getAccountHourUrl(propsToSave.id), propsToSave);
      } else  {
        await searchAndWorkClient.post(apiGeneralPath.accountHour, propsToSave);
      }
      setLoading(false);
      setSaved(true);
    } catch (e: any) {
      setLoading(false);
      setError(e.message)
    }
  }
  return {
    loading,
    error,
    saved,
    save
  }
};