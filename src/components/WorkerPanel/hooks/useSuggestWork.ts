import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { accountWorkPaths } from '../../../constants/apiPaths';

type UseSuggestWork = {
  sending: boolean;
  error: string;
  suggested: boolean;
  suggest: (workId: number, workerId: number) => Promise<void>;
}
export const useSuggestWork = (): UseSuggestWork => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [suggested, setSuggested] = useState(false);
  const suggest = async (workId: number, workerId: number): Promise<void> => {
    setSending(true);
    setError('');
    setSuggested(false);
    try {
      await searchAndWorkClient.post(accountWorkPaths.suggestWork, {
        workId,
        workerId
      });
      setSending(false);
      setSuggested(true);
    } catch (e: any) {
      setSending(false);
      setError(e.message)
    }
  }
  return {
    sending,
    error,
    suggested,
    suggest
  }
}