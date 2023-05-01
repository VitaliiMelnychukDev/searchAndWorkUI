import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { NoDecorationLink } from '../../styled';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import { useSaveWork, WorkPropsToSave } from '../hooks/useSaveWork';
import { useCities } from '../../../hooks/useCities';
import { useCategories } from '../../../hooks/useCategories';
import * as Yup from 'yup';
import { Loader } from '../../../components/Loader/Loader';
import { defaultError } from '../../../constants/message';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useSearchWorkers } from '../hooks/useSearchWorkers';
import { WorkersPanel } from './WorkersPanel/WorkersPanel';

const now = new Date().getTime();

const CitiesSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  title: Yup.string().min(2, 'Name should have at least 2 symbols!').required('Name is required'),
  description: Yup.string().min(2, 'Description should have at least 2 symbols!').required('Description is required'),
  payment: Yup.number().min(0.1, 'Payment should be more than 0!').required('Payment is required'),
  cityId: Yup.number().min(0, 'City is required').required('City is required'),
  address: Yup.string().min(2, 'Address should have at least 2 symbols!').required('Address is required'),
  categoryId: Yup.number().min(0, 'Category is required').required('Category is required'),
  startTime: Yup.number().min(now, 'Start Time can not be in the past!').required('Start Time is required'),
  endTime: Yup.number().min(now, 'End Time can not be in the past!').required('End Time is required'),
  countWorkers: Yup.number().min(1, 'At least 1 worker should be defined').required('Count Workers Is Required'),
});

export type WorkProps = {
  id?: number;
  cityId?: number;
  address: string;
  categoryId?: number;
  payment: number;
  title: string;
  description: string;
  email: string;
  phone?: string;
  startTime?: number;
  endTime?: number;
  countWorkers: number;
}
export const Work = ({
  id,
  email,
  title,
  description,
  payment,
  cityId,
  categoryId,
  phone,
  address,
  startTime,
  endTime,
  countWorkers
}: WorkProps): JSX.Element => {
  const { loading: savingWork, save, saved, error: savingWorkError } = useSaveWork();
  const { cities, loading: loadingCities, error: loadingCitiesError } = useCities();
  const { categories, loading: loadingCategories, error: loadingCategoriesError } = useCategories();
  const onSubmit = (worksData: Omit<WorkPropsToSave, 'id'>) => {
    save({
      ...worksData,
      id
    })
  }

  const loadingData = loadingCities || loadingCategories;
  const loadingDataError = loadingCitiesError || loadingCategoriesError;

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
          address,
          categoryId: categoryId || -1,
          countWorkers,
          startTime: Number(startTime) || now,
          endTime: Number(endTime) || now,
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
                    <TextField
                      variant="outlined"
                      id="address"
                      type={'text'}
                      label="Address"
                      value={values.address}
                      disabled={savingWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
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
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      id="countWorkers"
                      type={'text'}
                      label="Count Workers"
                      value={values.countWorkers}
                      disabled={savingWork}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.countWorkers && !!errors.countWorkers}
                      helperText={touched.countWorkers && errors.countWorkers}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <DateTimePicker
                      value={dayjs(values.startTime)}
                      onChange={(data: any) => {
                        setFieldValue('startTime', new Date(data.$d).getTime())
                      }}
                      label="Start Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors.startTime,
                          helperText: errors?.startTime,
                        },
                      }}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <DateTimePicker
                      value={dayjs(values.endTime)}
                      onChange={(data: any) => {
                        setFieldValue('endTime', new Date(data.$d).getTime())
                      }}
                      label="End Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors.endTime,
                          helperText: errors?.endTime,
                        },
                      }}
                    />
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
      {id && <WorkersPanel id={id} />}
    </>
  );
}