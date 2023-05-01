import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { accountCategoriesPaths, generalPath } from '../../constants/paths';
import React, { useEffect } from 'react';
import { useAccountCategories } from './hooks/useAccountCategories';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NoDecorationBlackLink, NoDecorationLink, PointerDeleteIcon } from '../styled';
import { Loader } from '../../components/Loader/Loader';
import { defaultError } from '../../constants/message';
import EditIcon from '@mui/icons-material/Edit';
import { useRemoveAccountCategory } from './hooks/useRemoveAccountCategory';

export const AccountCategories = ():JSX.Element => {
  const { user } = useAuthContext();
  const { accountCategories, loading, error } = useAccountCategories();
  const { removing, removed, remove, errorRemoving } = useRemoveAccountCategory();

  useEffect(() => {
    if (removed) {
      window.location.reload();
    }
  }, [removed]);

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  const removeAccountCategory = (id: number): void => {
    remove(id);
  }

  return (
    <MainContentWrapper subHeader="Account Categories" width={1100}>
      <>
        <Box sx={{ mb: 3}}>
          <NoDecorationLink to={accountCategoriesPaths.create}><Button variant="outlined" size="large" type="submit">
            Add Category
          </Button></NoDecorationLink>
        </Box>
        {(loading || removing) && <Loader />}
        {(error || errorRemoving) && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !removing && !error && !errorRemoving && (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '20px' }}>Category</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Description</TableCell>
                  <TableCell style={{ minWidth: '50px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountCategories
                  .map((accountCategory) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={`${accountCategory.accountId}_${accountCategory.category.id}`}>
                        <TableCell>{accountCategory.category.title}</TableCell>
                        <TableCell>{accountCategory.description}</TableCell>
                        <TableCell>
                          <NoDecorationBlackLink to={`${generalPath.accountCategories}/${accountCategory.category.id}`}><EditIcon/></NoDecorationBlackLink>
                          <PointerDeleteIcon onClick={() => removeAccountCategory(accountCategory.categoryId)}/>
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
}