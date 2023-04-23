import useAuthContext from '../../../store/Auth';
import { Navigate, useParams } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { useCompany } from '../hooks/useCompany';
import { Alert } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { Loader } from '../../../components/Loader/Loader';
import { Company } from '../Company/Company';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { loading, company, error } = useCompany(Number(id));


  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Company" width={900}>
      <>
        {loading && <Loader />}
        {(error || !company) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && company && <Company {...company} />}
      </>
    </MainContentWrapper>
  )
}