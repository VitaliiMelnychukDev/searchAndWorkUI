import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { Work } from '../../../types/Work';

type UseWork = {
  loading: boolean;
  work: Work | null;
  error: string;
}

export const useWork = (id: number): UseWork => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [work, setWork] = useState<Work | null>(null);

  const fetchWork = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const work: Work = await searchAndWorkClient.get(ApiUrlHelper.getWorkUrl(id));
      setWork(work);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchWork(id);
  }, [id]);


  return {
    loading,
    work,
    error,
  }
}