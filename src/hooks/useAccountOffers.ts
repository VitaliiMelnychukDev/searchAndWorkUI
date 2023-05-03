import { useEffect, useState } from 'react';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';
import searchAndWorkClient from '../clients/searchAndWork';
import { ApiUrlHelper } from '../helpers/ApiUrlHelper';
import { apiWorkPath } from '../constants/apiPaths';
import { Work, WorksResponse } from '../types/Work';

type UseOffersProps = {
  loading: boolean;
  error: string;
  offers: Work[];
}
export const useAccountOffers = (noChache = false): UseOffersProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offers, setOffers] = useState<Work[]>([]);

  const fetchOffers = async () => {
    setLoading(true);
    const offersUrl = ApiUrlHelper.buildUrlWithParams(apiWorkPath.getAccountWorks, {
      'limit': 1000,
    })

    try {
      const offersResponse: WorksResponse = await searchAndWorkClient.get(offersUrl);
      setOffers(offersResponse.works);
      cache.setCache(CacheKey.Offers, offersResponse.works);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const offers = cache.getCache<Work>(CacheKey.Offers);

    if (offers && !noChache) {
      setOffers(offers)
      setLoading(false);
    } else {
      fetchOffers()
    }
  }, [noChache]);


  return {
    loading,
    error,
    offers
  }
}