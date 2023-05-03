import useAuthContext from '../../../store/Auth';
import { Navigate, useParams } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import { Loader } from '../../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { useAccountCategory } from '../hooks/useAccountCategory';
import { AccountCategory } from '../AccountCategory/AccountCategory';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { loading, accountCategory, error } = useAccountCategory(Number(id));

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Offer" width={900}>
      <>
        {loading && <Loader />}
        {(error || !accountCategory) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && accountCategory && <AccountCategory categoryId={accountCategory.categoryId} description={accountCategory.description} />}
      </>
    </MainContentWrapper>
  );
}