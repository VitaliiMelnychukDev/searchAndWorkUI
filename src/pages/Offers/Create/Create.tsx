import useAuthContext from '../../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../../constants/paths';
import { MainContentWrapper } from '../../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { Offer } from '../Offer/Offer';

export const Create = (): JSX.Element => {
  const { user } = useAuthContext();


  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="New Offer" width={900}>
      <Offer address={''} countWorkers={1} email={''} title={''} description={''} payment={0} />
    </MainContentWrapper>
  )
}