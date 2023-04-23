import useAuthContext from '../../../store/Auth';
import { Navigate, useParams } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { Alert } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { Loader } from '../../../components/Loader/Loader';
import { useWork } from '../hooks/useWork';
import { Work } from '../Work/Work';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { loading, work, error } = useWork(Number(id));


  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Work" width={900}>
      <>
        {loading && <Loader />}
        {(error || !work) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && work && <Work {...work} />}
      </>
    </MainContentWrapper>
  )
}