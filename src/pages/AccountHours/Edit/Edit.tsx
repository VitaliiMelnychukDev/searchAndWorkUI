import useAuthContext from '../../../store/Auth';
import { Navigate, useParams } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import { useAccountHour } from '../hooks/useAccountHour';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import { Loader } from '../../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { AccountHour } from '../AccountHour/AccountHour';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { loading, accountHour, error } = useAccountHour(Number(id));

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Edit Account Hour" width={900}>
      <>
        {loading && <Loader />}
        {(error || !accountHour) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && accountHour && <AccountHour id={accountHour.id} startTime={Number(accountHour?.startTime)} endTime={Number(accountHour?.endTime)} />}
      </>
    </MainContentWrapper>
  );
}