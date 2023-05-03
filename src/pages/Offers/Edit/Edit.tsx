import useAuthContext from '../../../store/Auth';
import { Navigate, useParams } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { Alert } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { Loader } from '../../../components/Loader/Loader';
import { useOffer } from '../hooks/useOffer';
import { Offer } from '../Offer/Offer';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { loading, offer, error } = useOffer(Number(id));


  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Offer" width={900}>
      <>
        {loading && <Loader />}
        {(error || !offer) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && offer && <Offer {...offer} />}
      </>
    </MainContentWrapper>
  )
}