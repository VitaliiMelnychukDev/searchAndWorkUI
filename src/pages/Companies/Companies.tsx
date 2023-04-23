import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { companyPaths, generalPath } from '../../constants/paths';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import React from 'react';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAccountCompanies } from '../../hooks/useAccountCompanies';
import EditIcon from '@mui/icons-material/Edit';
import { NoDecorationBlackLink, NoDecorationLink } from '../styled';
import { Loader } from '../../components/Loader/Loader';
import { defaultError } from '../../constants/message';


export const Companies = (): JSX.Element => {
  const { user } = useAuthContext();
  const { companies, error,loading } = useAccountCompanies(true);

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }


  return (
    <MainContentWrapper subHeader="Companies" width={1100}>
      <>
        <Box sx={{ mb: 3}}>
          <NoDecorationLink to={companyPaths.create}><Button variant="outlined" size="large" type="submit">
            Create Company
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
                  <TableCell style={{ minWidth: '150px' }}>Address</TableCell>
                  <TableCell style={{ minWidth: '50px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies
                  .map((company) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={company.id}>
                        <TableCell>{company.id}</TableCell>
                        <TableCell>{company.title}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.phone}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell><NoDecorationBlackLink to={`${generalPath.companies}/${company.id}`}><EditIcon/></NoDecorationBlackLink></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    </MainContentWrapper>
  )
}