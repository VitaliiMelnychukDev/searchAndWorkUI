import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';
import React from 'react';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { NoDecorationLink } from '../styled';

export const UserPage = (): JSX.Element => {
  const { user } = useAuthContext();

  if (!user) {
    return  <Navigate to={generalPath.login} />
  }

  return (
    <MainContentWrapper subHeader="Account Details" width={900}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Name: </Typography><Typography>{user.name}</Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Email: </Typography><Typography>{user.email}</Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <NoDecorationLink to={generalPath.accountCategories}><Button variant="outlined" size="large" type="submit">
          Go to account categories
        </Button></NoDecorationLink>
      </Box>
      <Box sx={{ mb: 3 }}>
        <NoDecorationLink to={generalPath.accountHours}><Button variant="outlined" size="large" type="submit">
          Go to working hours
        </Button></NoDecorationLink>
      </Box>
      <Box sx={{ mb: 3 }}>
        <NoDecorationLink to={generalPath.offers}><Button variant="outlined" size="large" type="submit">
          Go to Offers
        </Button></NoDecorationLink>
      </Box>
      <Box sx={{ mb: 3 }}>
        <NoDecorationLink to={generalPath.works}><Button variant="outlined" size="large" type="submit">
          Go to Works
        </Button></NoDecorationLink>
      </Box>
    </MainContentWrapper>
  );
};