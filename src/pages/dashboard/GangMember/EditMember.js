import React, {  useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Grid, Stack, Container } from '@mui/material';
import axios from '../../../utils/axios';

import { PATH_DASHBOARD } from '../../../routes/paths';
import { MemberSchema, getDefaultValues } from '../AllSchema/gangmember';
import {  useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect } from '../../../components/hook-form';


export default function EditMember() {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { magictypes } = useSelector((state) => state.magictype);
  const { members } = useSelector((state) => state.member);
  const { elements } = useSelector((state) => state.element);
  const { products } = useSelector((state) => state.product);

console.log(products,"products=====")

  const currentMember = members.find((member) => member.id === +id);
  console.log(magictypes,'officer');
  console.log(currentMember,'single member');
  const defaultValues = useMemo(() => getDefaultValues(currentMember), [currentMember]);

  const methods = useForm({
    resolver: yupResolver(MemberSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting,errors },
  } = methods;
console.log(errors)
  const onSubmit = async () => {
    const formValues = getValues();
    try {
      const officer = new FormData();
      officer.append('last_name', formValues?.lname);
      officer.append('first_name', formValues?.fname);
      officer.append('email', formValues?.email);
      officer.append('password', formValues?.password);
      officer.append('supervisor_id', formValues?.supervisor_id);
      officer.append('subadmin_id', formValues?.subadmin_id);
      officer.append('officer_id', formValues?.officer_id);
      officer.append('_method', 'PUT');

      await axios.post(`admin/customer/${id}`, officer).then((response) => {
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
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Member" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6} sx={{ ml: 0 }}>
                      <Stack spacing={3}>
                        <RHFTextField name="fname" label="First Name" focused />
                        <RHFTextField name="email" label="Email" focused />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ ml: 0 }}>
                      <Stack spacing={3}>
                        <RHFTextField name="lname" label="Last Name" focused />
                        <RHFTextField name="password" label="Password" focused />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{ ml: 0, mt: 2 }}>
                      <Stack spacing={6}>
                        <RHFSelect name="subadmin_id" label="Select subadmin" focused>
                          <option value="Select subadmin">Select Sub Admin</option>
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
                        <RHFSelect name="supervisor_id" label="Select Supervisor" focused>
                          <option value="Select Supervisor">Select Supervisor</option>
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
                        <RHFSelect name="officer_id" label="Select officer" focused>
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
                      Update Member
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
