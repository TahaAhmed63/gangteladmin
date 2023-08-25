import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,Grid, Stack, Container } from '@mui/material';
// routes
import axios from '../../../utils/axios';
import {AdminSchema,getDefaultValues} from '../AllSchema/AdminSchema'
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';


export default function AddSubAdmin() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(() => getDefaultValues(), []);

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
    console.log(formValues)
    try {
      const subadmin=new FormData();
      subadmin.append('first_name',formValues?.fname)
      subadmin.append('last_name',formValues?.lname)
      subadmin.append('email',formValues?.email)
      subadmin.append('password',formValues?.password)
   
      await axios.post("admin/subadmin",subadmin)
      
      .then((response)=>{ 
        console.log(response)
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.subadmin.subadmin)
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };
  
  
  return (
    <Container maxWidth='sm'>
    <HeaderBreadcrumbs
      heading="Add Admin"
      links={[
        { name: '', href: '' },]}/>

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
              
              Create Admin
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
