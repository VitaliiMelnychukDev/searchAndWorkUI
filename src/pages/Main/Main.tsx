import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Alert, FormControl, Pagination, TextField } from '@mui/material';
import { Loader } from '../../components/Loader/Loader';
import { defaultError } from '../../constants/message';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useWorks } from '../../hooks/useWorks';
import config from '../../configs/base';
import Box from '@mui/material/Box';
import { PaginationWrapper, WorksContainer } from './styled';
import { WorkPanel } from '../../components/WorkPanel/WorkPanel';
import { generalPath } from '../../constants/paths';
import { NoDecorationBlackLink } from '../styled';

export const Main = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const { works, error,loading, fetchWorks, total } = useWorks();
  const [ pageNumber, setPageNumber] = useState(1)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  const handleSearch = (e: BaseSyntheticEvent): void => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    fetchWorks(pageNumber, searchTerm);
  }, [pageNumber, searchTerm]);

  const pageCount = Math.ceil(total/config.PAGINATION.COUNT_PER_PAGE);

  return (
    <MainContentWrapper subHeader="Find Offer" width={1100}>
      <>
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              id="searchTerm"
              type={'text'}
              label="Find Offer"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>
        </Box>
        {loading && !works.length && <Loader />}
        {error && <Alert severity="error">{defaultError}</Alert>}
        {!loading && !error && !!works.length && (
          <WorksContainer>
            {
              works.map(work => <NoDecorationBlackLink to={`${generalPath.work}/${work.id}`} ><WorkPanel work={work} /></NoDecorationBlackLink>)
            }
          </WorksContainer>
        )}
        {!!total && pageCount > 1 && (
          <PaginationWrapper>
            <Pagination count={Math.ceil(total/config.PAGINATION.COUNT_PER_PAGE)} page={pageNumber} onChange={handlePageChange} />
          </PaginationWrapper>
        )}
        {!error && !loading && !total && <Alert severity="info">No works found for you request!</Alert>}
      </>
    </MainContentWrapper>
  );
}