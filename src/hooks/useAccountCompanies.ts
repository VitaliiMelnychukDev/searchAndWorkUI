import { useEffect, useState } from 'react';
import { Company, CompanyResponse } from '../types/Company';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';
import searchAndWorkClient from '../clients/searchAndWork';
import { ApiUrlHelper } from '../helpers/ApiUrlHelper';
import { apiCompanyPath } from '../constants/apiPaths';

type UseCompaniesProps = {
  loading: boolean;
  error: string;
  companies: Company[];
}
export const useAccountCompanies = (noChache = false): UseCompaniesProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = async () => {
    setLoading(true);
    const companiesUrl = ApiUrlHelper.buildUrlWithParams(apiCompanyPath.search, {
      'limit': 1000,
    })

    try {
      const companiesResponse: CompanyResponse = await searchAndWorkClient.get(companiesUrl);
      setCompanies(companiesResponse.companies);
      cache.setCache(CacheKey.Companies, companiesResponse.companies);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const companies = cache.getCache<Company>(CacheKey.Companies);

    if (companies && !noChache) {
      setCompanies(companies)
      setLoading(false);
    } else {
      fetchCompanies()
    }
  }, [noChache]);


  return {
    loading,
    error,
    companies
  }
}