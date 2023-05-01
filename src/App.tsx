import * as React from 'react';
import { Suspense } from 'react';
import { Layout } from './pages/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { AuthProvider } from './store/Auth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function App() {
  return (
    <Suspense fallback={<Loader />} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
      </LocalizationProvider>
    </Suspense>
  );
};