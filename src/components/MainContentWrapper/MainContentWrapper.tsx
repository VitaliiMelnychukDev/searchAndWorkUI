import { Container, Content } from './styled';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


type Props = {
  children: JSX.Element | JSX.Element[] | null | boolean;
  subHeader?: string;
  width?: number;
}

export const MainContentWrapper = ({ children, subHeader, width}: Props): JSX.Element => {
  return (
    <Container>
      <Content width={width}>
        {subHeader && <Box textAlign='center' sx={{ mb: 4 }}><Typography variant="h4">{subHeader}</Typography></Box>}
        {children}
      </Content>
    </Container>
  )
}