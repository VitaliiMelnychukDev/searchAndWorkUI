import { useSearchWorkers } from '../../hooks/useSearchWorkers';
import { Loader } from '../../../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../../../constants/message';
import React from 'react';
import { Container, WorkersContainer } from '../styled';
import Typography from '@mui/material/Typography';
import { WorkerPanel } from '../../../../components/WorkerPanel/WorkerPanel';
import { useSearchAccountWorks } from '../../hooks/useSearchAccountWorks';
import { AccountWork, WorkStatus } from '../../../../types/AccountWork';
import { Worker } from '../../../../types/Work';

type Props = {
  workId: number;
}
export const PetentialsWorkersPanel = ({ workId }: Props): JSX.Element => {
  const {workers, loading, error} = useSearchWorkers(workId);
  const { accountWorks, loadingAccountWorks, errorAccountWorks } = useSearchAccountWorks(workId);

  const countWorkers = workers.filter(worker => !worker.workId).length;

  const pendingAccountWorks = accountWorks.filter(accountWork => accountWork.status === WorkStatus.Proposed);
  const approvedAccountWorks = accountWorks.filter(accountWork => accountWork.status === WorkStatus.Approved);

  const accountWorkToWorker = (accountWork: AccountWork): Worker => {
    const accountCategory = accountWork.account.workCategories.find(workCategory => {
      return workCategory.categoryId === accountWork.work.categoryId
    })

    return {
      id: accountWork.account.id,
      email: accountWork.account.email,
      phone: accountWork.account.phone,
      name: accountWork.account.name,
      categoryDescription: accountCategory?.description || '',
      categoryName: accountWork.work.category.title,
      cityName: accountWork.work.city.title,
      startTime: accountWork.work.startTime,
      endTime: accountWork.work.endTime,
      workId: accountWork.workId,
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h5">Potential Workers</Typography>
        {loading && <Loader />}
        {error && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && (
          workers.length && countWorkers ? (
            <WorkersContainer>
              {
                workers.map(worker => {
                  return worker.workId ? null : <WorkerPanel worker={worker} showDescription={true} enableSuggestWorkLogic={true} workId={workId} />;
                })
              }
            </WorkersContainer>
          ) : (
            <Alert severity="info">No potential workers found</Alert>
          )
        )}
      </Container>
      <Container>
        <Typography variant="h5">Pending Workers</Typography>
        {loadingAccountWorks && <Loader />}
        {errorAccountWorks && <Alert severity="error">{defaultError}</Alert>}
        {!loadingAccountWorks && !errorAccountWorks && (
          pendingAccountWorks.length ? (
            <WorkersContainer>
              {
                pendingAccountWorks.map(pendingAccountWork => {
                  const worker = accountWorkToWorker(pendingAccountWork);

                  return <WorkerPanel showTimes={false} worker={worker} showDescription={true} enableSuggestWorkLogic={false} workId={workId} />;
                })
              }
            </WorkersContainer>
          ) : (
            <Alert severity="info">No pendings workers found</Alert>
          )
        )}
      </Container>
      <Container>
        <Typography variant="h5">Approved Workers</Typography>
        {loadingAccountWorks && <Loader />}
        {errorAccountWorks && <Alert severity="error">{defaultError}</Alert>}
        {!loadingAccountWorks && !errorAccountWorks && (
          approvedAccountWorks.length ? (
            <WorkersContainer>
              {
                approvedAccountWorks.map(pendingAccountWork => {
                  const worker = accountWorkToWorker(pendingAccountWork);

                  return <WorkerPanel showTimes={false} worker={worker} showDescription={true} enableSuggestWorkLogic={false} workId={workId} />;
                })
              }
            </WorkersContainer>
          ) : (
            <Alert severity="info">No approved workers found</Alert>
          )
        )}
      </Container>
    </>
  );
}