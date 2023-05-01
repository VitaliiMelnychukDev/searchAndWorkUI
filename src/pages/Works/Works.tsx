import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath, workPaths } from '../../constants/paths';
import { useAccountWorks } from '../../hooks/useAccountWorks';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NoDecorationBlackLink, NoDecorationLink } from '../styled';
import { Loader } from '../../components/Loader/Loader';
import { defaultError } from '../../constants/message';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

export const Works = (): JSX.Element => {
  const { user } = useAuthContext();
  const { works, error,loading } = useAccountWorks(true);

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Works" width={1100}>
      <>
        <Box sx={{ mb: 3}}>
          <NoDecorationLink to={workPaths.create}><Button variant="outlined" size="large" type="submit">
            Create Work
          </Button></NoDecorationLink>
        </Box>
        {loading && <Loader />}
        {error && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '20px' }}>Id</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Name</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Email</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Phone</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Payment</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>City</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Category</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Start Time</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>End Time</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Count Workers</TableCell>
                  <TableCell style={{ minWidth: '50px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {works
                  .map((work) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={work.id}>
                        <TableCell>{work.id}</TableCell>
                        <TableCell>{work.title}</TableCell>
                        <TableCell>{work.email}</TableCell>
                        <TableCell>{work.phone}</TableCell>
                        <TableCell>{work.payment}</TableCell>
                        <TableCell>{work.city.title}</TableCell>
                        <TableCell>{work.category.title}</TableCell>
                        <TableCell>{new Date(Number(work.startTime)).toLocaleString()}</TableCell>
                        <TableCell>{new Date(Number(work.endTime)).toLocaleString()}</TableCell>
                        <TableCell>{work.countWorkers}</TableCell>
                        <TableCell><NoDecorationBlackLink to={`${generalPath.works}/${work.id}`}><EditIcon/></NoDecorationBlackLink></TableCell>
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
}