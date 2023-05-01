import { useEffect, useState } from 'react';
import { Worker } from '../../../types/Work';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

type UseSearchWorkers = {
  loading: boolean;
  workers: Worker[];
  error: string;
}

export const useSearchWorkers = (id: number): UseSearchWorkers => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workers, setWorkers] = useState<Worker[]>([]);

  const fetchWorkers = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const workers: Worker[] = await searchAndWorkClient.get(ApiUrlHelper.getSearchWorkersUrl(id));
      setWorkers(workers);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchWorkers(id);
  }, [id]);


  return {
    loading,
    workers,
    error,
  }
}