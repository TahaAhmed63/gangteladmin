/* eslint-disable react-hooks/exhaustive-deps */
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
import { FormProvider, RHFTextField } from '../../../components/hook-form';

export default function EditSubAdmin() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const currentAdmin = products.find((product) => product.id === +id);

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

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Admin" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="fname" label="First Name" focused/>
                  <RHFTextField name="lname" label="Last Name" focused/>
                  <RHFTextField name="email" label="Email" focused/>
                  <RHFTextField name="password" label="Password" focused/>

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
