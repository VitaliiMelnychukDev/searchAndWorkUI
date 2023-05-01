import * as Yup from 'yup';
import { useCategories } from '../../../hooks/useCategories';
import { AccountCategoryPropsToSave, useSaveAccountCategory } from '../hooks/useSaveAccountCategory';
import { Loader } from '../../../components/Loader/Loader';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { defaultError } from '../../../constants/message';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import { NoDecorationLink } from '../../styled';
import { generalPath } from '../../../constants/paths';
import React from 'react';

type Props = {
  categoryId?: number;
  description: string;
}

const AccountCategorySchema = Yup.object().shape({
  description: Yup.string().min(2, 'Description should have at least 2 symbols!').required('Description is required'),
  categoryId: Yup.number().min(0, 'Category is required').required('Category is required'),
});

export const AccountCategory = ({categoryId, description}: Props): JSX.Element => {
  const { loading: savingAccountCategory, save, saved, error: savingAccountCategoryError } = useSaveAccountCategory();
  const { categories, loading: loadingCategories, error: loadingCategoriesError } = useCategories();
  const onSubmit = (accountCategoryData: AccountCategoryPropsToSave) => {
    save(accountCategoryData, !!categoryId);
  }

  return (
    <>
      {loadingCategories && <Loader />}
      {loadingCategoriesError && <Alert severity="error">{defaultError}</Alert>}
      {!loadingCategories && !loadingCategoriesError && (
        <Formik onSubmit={onSubmit} initialValues={{
          description,
          categoryId: categoryId || -1,
        }} validationSchema={AccountCategorySchema}>
          {({ setFieldValue, errors, touched, values, handleChange, handleBlur }) => {
            return (
              <Form>
                <Box sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      id="description"
                      type={'text'}
                      label="Description"
                      value={values.description}
                      disabled={savingAccountCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
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
                      disabled={savingAccountCategory}
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
                  {savingAccountCategoryError && <Alert severity="error">{savingAccountCategoryError}</Alert>}
                </Box>
                <Box sx={{ mb: 4 }}>
                  {saved && <Alert severity="success">Account Category successfully saved</Alert>}
                </Box>
                <Box textAlign='center'>
                  <Button disabled={savingAccountCategory} variant="outlined" size="large" type="submit">
                    Save
                  </Button>
                  <NoDecorationLink to={generalPath.accountCategories}><Button variant="outlined" size="large" type="submit">
                    Go to account categories
                  </Button></NoDecorationLink>
                </Box>
              </Form>
            )}}
        </Formik>
      )}
    </>
  );
}