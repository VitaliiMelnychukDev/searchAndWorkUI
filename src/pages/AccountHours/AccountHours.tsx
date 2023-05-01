import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { accountHoursPaths, generalPath } from '../../constants/paths';
import React, { useEffect } from 'react';
import { useAccountHours } from './hooks/useAccountHours';
import { useRemoveAccountHour } from './hooks/useRemoveAccountHour';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NoDecorationBlackLink, NoDecorationLink, PointerDeleteIcon } from '../styled';
import { Loader } from '../../components/Loader/Loader';
import { defaultError } from '../../constants/message';
import EditIcon from '@mui/icons-material/Edit';

export const AccountHours = (): JSX.Element => {
  const { user } = useAuthContext();
  const { accountHours, loading, error } = useAccountHours();
  const { removing, removed, remove, errorRemoving } = useRemoveAccountHour();

  useEffect(() => {
    if (removed) {
      window.location.reload();
    }
  }, [removed]);

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  const removeAccountHour = (id: number): void => {
    remove(id);
  }

  return (
    <MainContentWrapper subHeader="Working Hours" width={1100}>
      <>
        <Box sx={{ mb: 3}}>
          <NoDecorationLink to={accountHoursPaths.create}><Button variant="outlined" size="large" type="submit">
            Add Working Hour
          </Button></NoDecorationLink>
        </Box>
        {(loading || removing) && <Loader />}
        {(error || errorRemoving) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !removing && !error && !errorRemoving && (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '20px' }}>Id</TableCell>
                  <TableCell style={{ minWidth: '20px' }}>Start Time</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>End Time</TableCell>
                  <TableCell style={{ minWidth: '50px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountHours
                  .map((accountHour) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={accountHour.id}>
                        <TableCell>{accountHour.id}</TableCell>
                        <TableCell>{new Date(Number(accountHour.startTime)).toLocaleString()}</TableCell>
                        <TableCell>{new Date(Number(accountHour.endTime)).toLocaleString()}</TableCell>
                        <TableCell>
                          <NoDecorationBlackLink to={`${generalPath.accountHours}/${accountHour.id}`}><EditIcon/></NoDecorationBlackLink>
                          <PointerDeleteIcon onClick={() => removeAccountHour(accountHour.id)}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    </MainContentWrapper>
  );
};