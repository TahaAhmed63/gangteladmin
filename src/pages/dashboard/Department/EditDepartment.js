/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,  Container, } from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';



export default function EditDepartment() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { departs } = useSelector((state) => state.depart);

  const currentdepart = departs.find((depart) =>depart.id === +(id))
  const departmentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:   currentdepart?.name || '',
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
      department.append('_method','PUT')
   
   await axios.post(`admin/department/${id}`,department)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
         navigate(PATH_DASHBOARD.department.department);
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
      heading="Edit Department"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label=" Name" focused />
              <Grid item xs={6} md={6}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
            Update Department
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
