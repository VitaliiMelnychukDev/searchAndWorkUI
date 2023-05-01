import { useSearchWorkers } from '../../hooks/useSearchWorkers';
import { Loader } from '../../../../components/Loader/Loader';
import { Alert } from '@mui/material';
import { defaultError } from '../../../../constants/message';
import React from 'react';
import { Container, WorkersContainer } from './styled';
import Typography from '@mui/material/Typography';

type Props = {
  id: number;
}
export const WorkersPanel = ({ id }: Props): JSX.Element => {
  const {workers, loading, error} = useSearchWorkers(id);
  return (
    <Container>
      <Typography variant="h5">Potential Workers</Typography>
      {loading && <Loader />}
      {error && <Alert severity="error">{defaultError}</Alert>}
      {!loading && !error && (
        workers.length ? (
            <WorkersContainer>
              {
                workers.map(worker => {
                  return (
                    <div>{worker.id}</div>
                  );
                })
              }
            </WorkersContainer>
          ) : (
          <Alert severity="info">No potential workers found</Alert>
        )
      )}
    </Container>
  );
}