import { useParams } from 'react-router-dom';
import { useWork } from '../Works/hooks/useWork';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Loader } from '../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../constants/message';
import React from 'react';
import { WorkPanel } from '../../components/WorkPanel/WorkPanel';

export const Work= (): JSX.Element => {
  const { id } = useParams();
  const { loading, work, error } = useWork(Number(id));

  return (
    <MainContentWrapper subHeader="Work Details" width={1100}>
      <>
        {loading && <Loader />}
        {error && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && work && <WorkPanel work={work} showDescription={true} />}
      </>
    </MainContentWrapper>
  )
}