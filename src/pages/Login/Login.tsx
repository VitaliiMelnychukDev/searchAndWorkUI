import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';
import useAuthContext from '../../store/Auth';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import React from 'react';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should have at least 8 symbols!')
    .required('Password id required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

type LoginData = {
  password: string;
  email: string;
}

export const Login = (): JSX.Element => {
  const { user, loadingStatus, login } = useAuthContext();

  if (user) {
    return <Navigate to={generalPath.account}/>;
  }

  const onSubmit = (data: LoginData) => {
    login(data.email, data.password);
  }

  return (
    <MainContentWrapper subHeader="Login" width={400}>
      <Formik onSubmit={onSubmit} initialValues={{
        password: '',
        email: ''
      }} validationSchema={LoginSchema}>
        {({ errors, touched, values, handleChange, handleBlur }) => {
          return (
          <Form>
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  id="email"
                  type={'text'}
                  label="Email"
                  value={values.email}
                  disabled={loadingStatus.loading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email &&!!errors.email}
                  helperText={touched.email && errors.email}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  id="password"
                  type={'password'}
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  disabled={loadingStatus.loading}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              {loadingStatus.error && <Alert severity="error">Not valid email or password</Alert>}
            </Box>
            <Box textAlign='center'>
              <Button disabled={loadingStatus.loading} variant="outlined" size="large" type="submit">
                Log In
              </Button>
            </Box>
          </Form>
        )}}
      </Formik>
    </MainContentWrapper>
  )
}