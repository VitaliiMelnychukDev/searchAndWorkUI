import { AccountHour as AccountHourProps } from '../../../types/AccountHour';
import { AccountHourPropsToSave, useSaveAccountHour } from '../hooks/useSaveAccountHour';
import { Alert, Button, FormControl } from '@mui/material';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { NoDecorationLink } from '../../styled';
import { generalPath } from '../../../constants/paths';
import React from 'react';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const now = new Date().getTime();
const AccountHourSchema = Yup.object().shape({
  startTime: Yup.number().min(now, 'Start Time can not be in the past!').required('Start Time is required'),
  endTime: Yup.number().min(now, 'End Time can not be in the past!').required('End Time is required'),
});


export const AccountHour = ({id, startTime, endTime}: Partial<AccountHourProps>): JSX.Element => {
  const { loading, save, saved, error } = useSaveAccountHour();
  const onSubmit = (accountHourData: AccountHourPropsToSave) => {
    save({
      ...accountHourData,
      ...(id && { id })
    });
  }

  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={{
        startTime: startTime || now,
        endTime: endTime || now,
      }} validationSchema={AccountHourSchema}>
        {({ setFieldValue, errors, touched, values, handleChange, handleBlur }) => {
          return (
            <Form>
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
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
              <Box sx={{ mb: 4 }}>
                {saved && <Alert severity="success">Account Hour successfully saved</Alert>}
              </Box>
              <Box textAlign='center'>
                <Button disabled={loading} variant="outlined" size="large" type="submit">
                  Save
                </Button>
                <NoDecorationLink to={generalPath.accountHours}><Button variant="outlined" size="large" type="submit">
                  Go to account hours
                </Button></NoDecorationLink>
              </Box>
            </Form>
          )}}
      </Formik>
    </>
  );
}