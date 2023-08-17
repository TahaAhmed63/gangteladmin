import React, {  useMemo } from 'react';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Card,  Grid, Stack, Container } from '@mui/material';
import axios from '../../../utils/axios';

import { MemberSchema, getDefaultValues } from '../AllSchema/gangmember';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect} from '../../../components/hook-form';

export default function AddMember() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const { magictypes} = useSelector((state) => state.magictype);
  const { products } = useSelector((state) => state.product);
  const { elements } = useSelector((state) => state.element);

  const defaultValues = useMemo(() => getDefaultValues(), []);

  const methods = useForm({
    resolver: yupResolver(MemberSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  console.log(errors);

  const onSubmit = async () => {
    const formValues = getValues();
    try {
      const officer = new FormData();
      officer.append('last_name', formValues?.fname);
      officer.append('first_name', formValues?.lname);
      officer.append('email', formValues?.email);
      officer.append('password', formValues?.password);
      officer.append('officer_id', formValues?.officer_id);
      officer.append('subadmin_id', formValues?.subadmin_id);
      officer.append('supervisor_id', formValues?.supervisor_id);

      console.log(officer);
      await axios
        .post('admin/customer', officer)

        .then((response) => {
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            reset();
            navigate(PATH_DASHBOARD.gangmember.member);
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
    <Container maxWidth="md">
      <HeaderBreadcrumbs heading="Add Member" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6} sx={{ ml: 0 }}>
                      <Stack spacing={3}>
                        <RHFTextField name="fname" label="First Name" />
                        <RHFTextField name="email" label="Email" />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ ml: 0 }}>
                      <Stack spacing={3}>
                        <RHFTextField name="lname" label="Last Name" />
                        <RHFTextField name="password" label="Password" />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ ml: 0, mt: 2 }}>
                      <Stack spacing={6}>
                        <RHFSelect name="subadmin_id" label="Select subadmin">
                          <option value="Select subadmin">Select subadmin</option>
                          {products?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                              {`${e?.first_name} ${e?.last_name}`}
                            </option>
                          ))}
                        </RHFSelect>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ ml: 0, mt: 2 }}>
                      <Stack spacing={6}>
                        <RHFSelect name="supervisor_id" label="Select supervisor">
                          <option value="Select subadmin">Select supervisor</option>
                          {elements?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                              {`${e?.first_name} ${e?.last_name}`}
                            </option>
                          ))}
                        </RHFSelect>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ ml: 0, mt: 2 }}>
                      <Stack spacing={6}>
                        <RHFSelect name="officer_id" label="Select officer">
                          <option value="Select officer">Select Officer</option>
                          {magictypes?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                              {`${e?.first_name} ${e?.last_name}`}
                            </option>
                          ))}
                        </RHFSelect>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Create Member
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
