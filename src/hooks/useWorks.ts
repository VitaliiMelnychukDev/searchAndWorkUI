import { useState } from 'react';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';
import searchAndWorkClient from '../clients/searchAndWork';
import { ApiUrlHelper } from '../helpers/ApiUrlHelper';
import { apiWorkPath } from '../constants/apiPaths';
import { Work, WorksResponse } from '../types/Work';
import config from '../configs/base';

type UseWorksProps = {
  loading: boolean;
  error: string;
  works: Work[];

  fetchWorks: (pageNumber: number, searchTerm?: string) => void;
  total: number;
}

const countPerPage = config.PAGINATION.COUNT_PER_PAGE;
export const useWorks = (): UseWorksProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [works, setWorks] = useState<Work[]>([]);
  const [total, setTotal] = useState(0);

  const fetchWorks = async (pageNumber: number, searchTerm?: string) => {
    setLoading(true);
    const worksUrl = ApiUrlHelper.buildUrlWithParams(apiWorkPath.search, {
      ...(searchTerm && {searchTerm}),
      'limit': countPerPage,
      'page': pageNumber
    })

    try {
      const worksResponse: WorksResponse = await searchAndWorkClient.get(worksUrl);
      setWorks(worksResponse.works);
      setTotal(worksResponse.total);
      cache.setCache(CacheKey.Offers, worksResponse.works);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    works,
    fetchWorks,
    total,
  }
}