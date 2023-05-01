import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { apiGeneralPath } from '../../../constants/apiPaths';
import { AccountCategory } from '../../../types/AccountCategory';

export type AccountCategoryPropsToSave = Pick<AccountCategory,  'categoryId' | 'description' >;

type UseSaveAccountCategory = {
  loading: boolean;
  error: string;
  saved: boolean;
  save: (accountCategoryProps: AccountCategoryPropsToSave, update: boolean) => Promise<void>;
}

export const useSaveAccountCategory = (): UseSaveAccountCategory => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const save = async (accountCategoryProps: AccountCategoryPropsToSave, update: boolean): Promise<void> => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const propsToSave = {
        ...accountCategoryProps
      }
      if (update) {
        await searchAndWorkClient.put(apiGeneralPath.accountCategory, propsToSave);
      } else  {
        await searchAndWorkClient.post(apiGeneralPath.accountCategory, propsToSave);
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