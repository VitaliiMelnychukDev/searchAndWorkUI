import * as React from 'react';
import { Suspense } from 'react';
import { Layout } from './pages/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { AuthProvider } from './store/Auth';

export default function App() {
  return (
    <Suspense fallback={<Loader />} >
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Suspense>
  );
};