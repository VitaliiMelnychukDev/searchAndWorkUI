import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { apiGeneralPath } from '../../../constants/apiPaths';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { CompanyProps } from '../Company/Company';

type UseSaveCompany = {
  loading: boolean;
  error: string;
  saved: boolean;
  save: (companyProps: CompanyProps) => Promise<void>;
}

export const useSaveCompany = (): UseSaveCompany => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const save = async (companyProps: CompanyProps): Promise<void> => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const propsToSave = {
        ...companyProps
      }
      if (propsToSave.phone !== undefined && propsToSave.phone.length === 0) {
        delete propsToSave.phone;
      }
      if (companyProps.id) {
        await searchAndWorkClient.put(ApiUrlHelper.getCompanyUrl(companyProps.id), propsToSave);
      } else  {
        await searchAndWorkClient.post(apiGeneralPath.company, propsToSave);
      }
      setLoading(false);
      setSaved(true);
    } catch (e: any) {
      setLoading(false);
      setError(e.message)
    }
  }
  return {
    loading,
    error,
    saved,
    save
  }
};