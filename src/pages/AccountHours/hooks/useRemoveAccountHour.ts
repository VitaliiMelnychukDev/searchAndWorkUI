import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

type UseRemoveAccountHour = {
  removing: boolean;
  errorRemoving: string;
  removed: boolean;
  remove: (id: number) => Promise<void>;
}
export const useRemoveAccountHour = (): UseRemoveAccountHour => {
  const [removing, setRemoving] = useState(false);
  const [errorRemoving, setError] = useState('');
  const [removed, setRemoved] = useState(false);
  const remove = async (id: number): Promise<void> => {
    setRemoving(true);
    setError('');
    setRemoved(false);
    try {
      await searchAndWorkClient.delete(ApiUrlHelper.getAccountHourUrl(id));
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