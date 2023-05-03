import React from 'react';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';
import { useAccountWorks } from './hooks/useAccountWorks';
import { WorkStatus } from '../../types/AccountWork';
import { WorkPanel } from '../../components/WorkPanel/WorkPanel';
import { Loader } from '../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../constants/message';
import Typography from '@mui/material/Typography';
import { Container, WorksContainer } from './styled';

export const Works = (): JSX.Element => {
  const { user } = useAuthContext();
  const { works, loading, error } = useAccountWorks();

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  const suggestedAccountWorks = works.filter(accountWork => accountWork.status === WorkStatus.Proposed);
  const approvedAccountWorks = works.filter(accountWork => accountWork.status === WorkStatus.Approved);

  return (
    <MainContentWrapper subHeader="Works" width={1100}>
      <>
        <Container>
          <Typography variant="h5">Suggested Works</Typography>
          {loading && <Loader />}
          {error && <Alert severity="error">{defaultError}</Alert>}
          {!loading && !error && (
            suggestedAccountWorks.length ? (
              <WorksContainer>
                {
                  suggestedAccountWorks.map(accountWork => <WorkPanel enableSetWorkStatusLogic={true} work={accountWork.work} showDescription={true} />)
                }
              </WorksContainer>
            ) : (
              <Alert severity="info">No suggested works found</Alert>
            )
          )}
        </Container>
        <Container>
          <Typography variant="h5">Approved Works</Typography>
          {loading && <Loader />}
          {error && <Alert severity="error">{defaultError}</Alert>}
          {!loading && !error && (
            approvedAccountWorks.length ? (
              <WorksContainer>
                {
                  approvedAccountWorks.map(accountWork => <WorkPanel work={accountWork.work} showDescription={true} />)
                }
              </WorksContainer>
            ) : (
              <Alert severity="info">No approved works found</Alert>
            )
          )}
        </Container>
      </>
    </MainContentWrapper>
  );
}