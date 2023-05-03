import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { Work } from '../../../types/Work';

type UseOffer = {
  loading: boolean;
  offer: Work | null;
  error: string;
}

export const useOffer = (id: number): UseOffer => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offer, setOffer] = useState<Work | null>(null);

  const fetchOffer = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const offer: Work = await searchAndWorkClient.get(ApiUrlHelper.getWorkUrl(id));
      setOffer(offer);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchOffer(id);
  }, [id]);


  return {
    loading,
    offer,
    error,
  }
}