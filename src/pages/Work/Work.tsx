import { useParams } from 'react-router-dom';
import { useOffer } from '../Offers/hooks/useOffer';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Loader } from '../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../constants/message';
import React from 'react';
import { WorkPanel } from '../../components/WorkPanel/WorkPanel';

export const Work = (): JSX.Element => {
  const { id } = useParams();
  const { loading, offer, error } = useOffer(Number(id));

  return (
    <MainContentWrapper subHeader="Offer Details" width={1100}>
      <>
        {loading && <Loader />}
        {error && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && offer && <WorkPanel work={offer} showDescription={true} />}
      </>
    </MainContentWrapper>
  )
}