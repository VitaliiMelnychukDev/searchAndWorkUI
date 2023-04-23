import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { NoDecorationLink } from '../../styled';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import { useSaveWork, WorkPropsToSave } from '../hooks/useSaveWork';
import { useCities } from '../../../hooks/useCities';
import { useCategories } from '../../../hooks/useCategories';
import { useAccountCompanies } from '../../../hooks/useAccountCompanies';
import * as Yup from 'yup';
import { Loader } from '../../../components/Loader/Loader';
import { defaultError } from '../../../constants/message';

const CitiesSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  title: Yup.string().min(2, 'Name should have at least 2 symbols!').required('Name is required'),
  description: Yup.string().min(2, 'Description should have at least 2 symbols!').required('Description is required'),
  payment: Yup.number().min(0.1, 'Payment should be more than 0!').required('Payment is required'),
  cityId: Yup.number().min(0, 'City is required').required('City is required'),
  companyId: Yup.number().min(0, 'Company is required').required('Company is required'),
  categoryId: Yup.number().min(0, 'Category is required').required('Category is required'),
});

export type WorkProps = {
  id?: number;
  companyId?: number;
  cityId?: number;
  categoryId?: number;
  payment: number;
  title: string;
  description: string;
  email: string;
  phone?: string;
}
export const Work = ({id, email, title, description, payment, cityId, categoryId, companyId, phone}: WorkProps): JSX.Element => {
  const { loading: savingWork, save, saved, error: savingWorkError } = useSaveWork();
  const { cities, loading: loadingCities, error: loadingCitiesError } = useCities();
  const { categories, loading: loadingCategories, error: loadingCategoriesError } = useCategories();
  const { companies, loading: loadingCompanies, error: loadingCompaniesError } = useAccountCompanies();
  const onSubmit = (worksData: Omit<WorkPropsToSave, 'id'>) => {
    console.log('Data to save:', worksData);
    save({
      ...worksData,
      id
    })
  }

  const loadingData = loadingCities || loadingCategories || loadingCompanies;
  const loadingDataError = loadingCitiesError || loadingCompaniesError || loadingCategoriesError;

  return (
    <>
      {loadingData && <Loader />}
      {loadingDataError && <Alert severity="error">{defaultError}</Alert>}
      {!loadingData && !loadingDataError && (
        <Formik onSubmit={onSubmit} initialValues={{
          email,
          phone,
          title,
          description,
          payment,
          cityId: cityId || -1,
          categoryId: categoryId || -1,
          companyId: companyId || -1,
        }} validationSchema={CitiesSchema}>
          {({ setFieldValue, errors, touched, values, handleChange, handleBlur }) => {
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
                      disabled={savingWork}
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
                      disabled={savingWork}
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
                      disabled={savingWork}
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
                      id="description"
                      type={'text'}
                      label="Description"
                      value={values.description}
                      disabled={savingWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      id="payment"
                      type={'number'}
                      label="Payment"
                      value={values.payment}
                      disabled={savingWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.payment && !!errors.payment}
                      helperText={touched.payment && errors.payment}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="companyId">Company</InputLabel>
                    <Select
                      id="companyId"
                      label="Company"
                      value={values.companyId}
                      disabled={savingWork}
                      onChange={(e) => {
                        setFieldValue('companyId', e.target.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.companyId && !!errors.companyId}
                    >
                      {companies.map(company => <MenuItem value={company.id}>{company.title}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="cityId">City</InputLabel>
                    <Select
                      id="cityId"
                      label="City"
                      value={values.cityId}
                      disabled={savingWork}
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
                    <InputLabel id="cityId">Category</InputLabel>
                    <Select
                      id="categoryId"
                      label="Category"
                      value={values.categoryId}
                      disabled={savingWork}
                      onChange={(e) => {
                        setFieldValue('categoryId', e.target.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.categoryId && !!errors.categoryId}
                    >
                      {categories.map(category => <MenuItem value={category.id}>{category.title}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  {savingWorkError && <Alert severity="error">{savingWorkError}</Alert>}
                </Box>
                <Box sx={{ mb: 4 }}>
                  {saved && <Alert severity="success">Company successfully saved</Alert>}
                </Box>
                <Box textAlign='center'>
                  <Button disabled={savingWork} variant="outlined" size="large" type="submit">
                    Save
                  </Button>
                  <NoDecorationLink to={generalPath.works}><Button variant="outlined" size="large" type="submit">
                    Go to works
                  </Button></NoDecorationLink>
                </Box>
              </Form>
            )}}
        </Formik>
      )}
    </>
  );
}