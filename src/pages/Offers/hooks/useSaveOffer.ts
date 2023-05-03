import { useState } from 'react';
import searchAndWorkClient from '../../../clients/searchAndWork';
import { apiGeneralPath } from '../../../constants/apiPaths';
import { ApiUrlHelper } from '../../../helpers/ApiUrlHelper';
import { Work } from '../../../types/Work';

export type OfferPropsToSave = Pick<
  Work,
  'cityId'
  | 'categoryId'
  | 'payment'
  | 'title'
  | 'description'
  | 'email'
  | 'phone'
  | 'address'
  | 'startTime'
  | 'endTime'
  | 'countWorkers'
> & {
  id?: number
}

type UseSaveOffer = {
  loading: boolean;
  error: string;
  saved: boolean;
  save: (offerProps: OfferPropsToSave) => Promise<void>;
}

export const useSaveOffer = (): UseSaveOffer => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const save = async (offerProps: OfferPropsToSave): Promise<void> => {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const propsToSave = {
        ...offerProps
      }
      if (propsToSave.phone !== undefined && propsToSave.phone.length === 0) {
        delete propsToSave.phone;
      }
      if (offerProps.id) {
        await searchAndWorkClient.put(ApiUrlHelper.getWorkUrl(offerProps.id), propsToSave);
      } else  {
        await searchAndWorkClient.post(apiGeneralPath.work, propsToSave);
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