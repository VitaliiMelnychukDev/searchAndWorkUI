import React from 'react';
import { CircularProgress } from '@mui/material';

export const Loader = (): JSX.Element => {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
}