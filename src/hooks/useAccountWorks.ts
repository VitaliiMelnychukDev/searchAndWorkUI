import { useEffect, useState } from 'react';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';
import searchAndWorkClient from '../clients/searchAndWork';
import { ApiUrlHelper } from '../helpers/ApiUrlHelper';
import { apiWorkPath } from '../constants/apiPaths';
import { Work, WorksResponse } from '../types/Work';

type UseWorksProps = {
  loading: boolean;
  error: string;
  works: Work[];
}
export const useAccountWorks = (noChache = false): UseWorksProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [works, setWorks] = useState<Work[]>([]);

  const fetchWorks = async () => {
    setLoading(true);
    const worksUrl = ApiUrlHelper.buildUrlWithParams(apiWorkPath.search, {
      'limit': 1000,
    })

    try {
      const worksResponse: WorksResponse = await searchAndWorkClient.get(worksUrl);
      setWorks(worksResponse.works);
      cache.setCache(CacheKey.Works, worksResponse.works);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const works = cache.getCache<Work>(CacheKey.Works);

    if (works && !noChache) {
      setWorks(works)
      setLoading(false);
    } else {
      fetchWorks()
    }
  }, [noChache]);


  return {
    loading,
    error,
    works
  }
}