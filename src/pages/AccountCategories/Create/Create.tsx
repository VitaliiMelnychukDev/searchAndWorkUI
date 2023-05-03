import useAuthContext from '../../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import { AccountCategory } from '../AccountCategory/AccountCategory';

export const Create = (): JSX.Element => {
  const { user } = useAuthContext();

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="New Offer" width={900}>
      <AccountCategory description={''} />
    </MainContentWrapper>
  )
}