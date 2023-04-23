import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';
import React from 'react';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import * as Yup from 'yup';
import { RegisterProps, useRegister } from './hooks/useRegister';

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should have at least 8 symbols!')
    .required('Password id required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  name: Yup.string().min(2, 'Name should have at least 2 symbols!').required('Name is required')
});

export const Register = (): JSX.Element => {
  const { user } = useAuthContext();
  const { loading, error, register, registered } = useRegister();

  if (user) {
    return <Navigate to={generalPath.account}/>;
  }

  const onSubmit = (registerData: RegisterProps) => {
    register(registerData);
  }

  return (
    <MainContentWrapper subHeader="Register" width={400}>
      <Formik onSubmit={onSubmit} initialValues={{
        password: '',
        email: '',
        phone: '',
        name: ''
      }} validationSchema={RegisterSchema}>
        {({ errors, touched, values, handleChange, handleBlur }) => {
          return (
            <Form>
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    id="name"
                    type={'text'}
                    label="Name"
                    value={values.name}
                    disabled={loading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name &&!!errors.name}
                    helperText={touched.name && errors.name}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    id="email"
                    type={'text'}
                    label="Email"
                    value={values.email}
                    disabled={loading}
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
                    id="phone"
                    type={'text'}
                    label="Phone"
                    value={values.phone}
                    disabled={loading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone &&!!errors.phone}
                    helperText={touched.phone && errors.phone}
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
                    disabled={loading}
                    onBlur={handleBlur}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mb: 4 }}>
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
              <Box sx={{ mb: 4 }}>
                {registered && <Alert severity="success">User successfully registered</Alert>}
              </Box>
              <Box textAlign='center'>
                <Button disabled={loading} variant="outlined" size="large" type="submit">
                  Register
                </Button>
              </Box>
            </Form>
          )}}
      </Formik>
    </MainContentWrapper>
  )
}
