import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { useSaveCompany } from '../hooks/useSaveCompany';
import { generalPath } from '../../../constants/paths';
import { NoDecorationLink } from '../../styled';

const CompanySchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().min(6, 'Address should have at least 2 symbols!').required('Address is required'),
  phone: Yup.string(),
  title: Yup.string().min(2, 'Name should have at least 2 symbols!').required('Name is required'),
  description: Yup.string().min(2, 'Description should have at least 2 symbols!').required('Description is required')
});

export type CompanyProps = {
  id?: number,
  email: string,
  address: string,
  phone?: string,
  title: string,
  description: string
}

export const Company = ({id , email, address, phone, title, description}: CompanyProps): JSX.Element => {
  const { loading, save, saved, error } = useSaveCompany();
  const onSubmit = (companyData: Omit<CompanyProps, 'id'>) => {
    save({
      ...companyData,
      id
    })
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{
      email,
      phone,
      title,
      address,
      description,
    }} validationSchema={CompanySchema}>
      {({ errors, touched, values, handleChange, handleBlur }) => {
        return (
          <Form>
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  id="title"
                  type={'text'}
                  label="Name"
                  value={values.title}
                  disabled={loading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
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
                  error={touched.email && !!errors.email}
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
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
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
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  id="description"
                  type={'text'}
                  label="Description"
                  value={values.description}
                  disabled={loading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 4 }}>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <Box sx={{ mb: 4 }}>
              {saved && <Alert severity="success">Company successfully saved</Alert>}
            </Box>
            <Box textAlign='center'>
              <Button disabled={loading} variant="outlined" size="large" type="submit">
                Save
              </Button>
              <NoDecorationLink to={generalPath.companies}><Button variant="outlined" size="large" type="submit">
                Go to companies
              </Button></NoDecorationLink>
            </Box>
          </Form>
        )}}
    </Formik>
  );
}