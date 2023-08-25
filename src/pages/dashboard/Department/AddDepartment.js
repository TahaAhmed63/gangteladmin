import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,Grid, Stack, Container } from '@mui/material';
// routes
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';

export default function AddTag() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const departmentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:  '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(departmentSchema),
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
      const department=new FormData();
      department.append('name',formValues?.name)   
      await axios.post("admin/department",department)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.department.department)
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
      heading="Add Department"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label=" Name" />
              <Grid item xs={6} md={6}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
              Create Department
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
