import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container } from '@mui/material';
import { AdminSchema, getDefaultValues } from '../AllSchema/AdminSchema';
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFDescription } from '../../../components/hook-form';

export default function EditSubAdmin() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const person = useSelector((state) => state);
  console.log(person, 'checking new products');
  const currentAdmin = products.find((product) => product.id === +id);
  console.log(currentAdmin, 'details admin--->>>');

  const defaultValues = useMemo(() => getDefaultValues(currentAdmin), []);

  const methods = useForm({
    resolver: yupResolver(AdminSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const subadmin = new FormData();
      subadmin.append('first_name', formValues?.fname);
      subadmin.append('last_name', formValues?.lname);
      subadmin.append('email', formValues?.email);
      subadmin.append('password', formValues?.password);
      subadmin.append('_method', 'PUT');

      await axios
        .post(`admin/subadmin/${id}`, subadmin)

        .then((response) => {
          if (response?.data?.status === true) {
            reset();
            enqueueSnackbar(response?.data?.message);
            navigate(PATH_DASHBOARD.subadmin.subadmin);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      OnSubmit(methods.getValues()); // Call the onSubmit function
    }
  };

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Admin" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="fname" label="First Name" />
                  <RHFTextField name="lname" label="Last Name" />
                  <RHFTextField name="email" label="Email" />
                  <RHFTextField name="password" label="Password" />

                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Update Admin
                    </LoadingButton>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
