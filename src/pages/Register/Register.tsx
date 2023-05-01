import useAuthContext from '../../store/Auth';
import { Navigate } from 'react-router-dom';
import { generalPath } from '../../constants/paths';
import React from 'react';
import { MainContentWrapper } from '../../components/MainContentWrapper/MainContentWrapper';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import * as Yup from 'yup';
import { RegisterProps, useRegister } from './hooks/useRegister';
import { useCities } from '../../hooks/useCities';

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should have at least 8 symbols!')
    .required('Password id required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  cityId: Yup.number().min(0, 'City is required').required('City is required'),
  name: Yup.string().min(2, 'Name should have at least 2 symbols!').required('Name is required'),
  address: Yup.string().min(2, 'Address should have at least 2 symbols!').required('Address is required')
});

export const Register = (): JSX.Element => {
  const { user } = useAuthContext();
  const { loading: registeringUser, error, register, registered } = useRegister();
  const { cities, loading: loadingCities } = useCities();

  if (user) {
    return <Navigate to={generalPath.account}/>;
  }

  const onSubmit = (registerData: RegisterProps) => {
    register(registerData);
  }

  const loading = registeringUser || loadingCities;
  return (
    <MainContentWrapper subHeader="Register" width={400}>
      <Formik onSubmit={onSubmit} initialValues={{
        password: '',
        email: '',
        phone: '',
        name: '',
        cityId: -1,
        address: ''
      }} validationSchema={RegisterSchema}>
        {({ errors,setFieldValue, touched, values, handleChange, handleBlur }) => {
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
                  <InputLabel id="cityId">City</InputLabel>
                  <Select
                    id="cityId"
                    label="City"
                    value={values.cityId}
                    disabled={loading}
                    onChange={(e) => {
                      setFieldValue('cityId', e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={touched.cityId && !!errors.cityId}
                  >
                    {cities.map(city => <MenuItem value={city.id}>{city.title}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    id="address"
                    type={'text'}
                    label="Address"
                    value={values.address}
                    disabled={loading}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address &&!!errors.address}
                    helperText={touched.address && errors.address}
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
