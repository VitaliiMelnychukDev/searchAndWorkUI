import useAuthContext from '../../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { Company } from '../Company/Company';

export const Create = (): JSX.Element => {
  const { user } = useAuthContext();


  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="New Company" width={900}>
      <Company email={''} address={''} title={''} description={''} />
    </MainContentWrapper>
  )
}