import { Company } from '../../../types/Company';
import { useEffect, useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';

type UseCompany = {
  loading: boolean;
  company: Company | null;
  error: string;
}

export const useCompany = (id: number): UseCompany => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [company, setCompany] = useState<Company | null>(null);

  const fetchCompany = async (id: number): Promise<void> => {
    setLoading(true);

    try {
      const company: Company = await searchAndWorkClient.get(ApiUrlHelper.getCompanyUrl(id));
      setCompany(company);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchCompany(id);
  }, [id]);


  return {
    loading,
    company,
    error,
  }
}