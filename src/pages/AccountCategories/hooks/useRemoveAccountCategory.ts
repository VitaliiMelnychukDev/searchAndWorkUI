import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

type UseRemoveAccountCategory = {
  removing: boolean;
  errorRemoving: string;
  removed: boolean;
  remove: (id: number) => Promise<void>;
}
export const useRemoveAccountCategory = (): UseRemoveAccountCategory => {
  const [removing, setRemoving] = useState(false);
  const [errorRemoving, setError] = useState('');
  const [removed, setRemoved] = useState(false);
  const remove = async (id: number): Promise<void> => {
    setRemoving(true);
    setError('');
    setRemoved(false);
    try {
      await searchAndWorkClient.delete(ApiUrlHelper.getAccountCategoryUrl(id));
      setRemoving(false);
      setRemoved(true);
    } catch (e: any) {
      setRemoving(false);
      setError(e.message)
    }
  }
  return {
    removing,
    errorRemoving,
    removed,
    remove
  }
}