import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container, } from '@mui/material';
import {SupervisorSchema,getDefaultValues} from '../AllSchema/SupervisorSchema'
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
} from '../../../components/hook-form';



export default function EditElement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { elements } = useSelector((state) => state.element);

  const currentSupervisor = elements.find((element) =>element.id === +(id))
  console.log(currentSupervisor)
  const { departs } = useSelector((state) => state.depart);
  const { products } = useSelector((state) => state.product);
  const defaultValues = useMemo(() => getDefaultValues(currentSupervisor), [currentSupervisor]);

  const methods = useForm({
    resolver: yupResolver(SupervisorSchema),
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
      const supervisor = new FormData();
      supervisor.append('first_name', formValues?.fname);
      supervisor.append('last_name', formValues?.lname);
      supervisor.append('email', formValues?.email);
      supervisor.append('password', formValues?.password);
      supervisor.append('phone', formValues?.phoneNumber);
      supervisor.append('address', formValues?.address);
      supervisor.append('department_id', formValues?.department_id);
      supervisor.append('subadmin_id', formValues?.subadmin_id);
      supervisor.append('supervisor_name', formValues?.supervisor_name);
      supervisor.append('supervisor_email', formValues?.supervisor_email);
      supervisor.append('supervisor_number', formValues?.supervisor_phoneNumber);
      supervisor.append('_method', 'PUT');
   
      await axios.post(`admin/supervisor/${id}`,supervisor)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
        navigate(PATH_DASHBOARD.supervisor.supervisor);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };


  return (
    <Container maxWidth="sm">
    <HeaderBreadcrumbs heading="Edit Supervisor" links={[{ name: '', href: '' }]} />

    <Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={1} sx={{ p: 3 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextField name="fname" label="First Name" focused/>
              <RHFTextField name="email" label="Email" focused/>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
                <RHFTextField name="lname" label="Last Name"  focused/>
                <RHFTextField name="password" label="Password" focused/>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextField name="phoneNumber" label=" Phone" focused/>

              <div>
                <RHFTextField name="address" label="Address" focused/>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextField name="supervisor_name" label=" Supervisor Name" focused/>

              <div>
                <RHFTextField name="supervisor_email" label="Supervisor Email" focused/>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextField name="supervisor_phoneNumber" label="Supervisor Number" focused/>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFSelect name="department_id" label="Select Your Sub Admin" focused>
                <option>Select Department</option>
                {departs?.map((e) => (
                  <option key={e?.id} value={e?.id}>
                    {e?.name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <RHFSelect name="department_id" label="Select Your Sub Admin" focused>
                <option>Select Sub Admin</option>
                {products?.map((e) => (
                  <option key={e?.id} value={e?.id}>
                    {e?.first_name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </Grid>
          <Grid item xs={4} md={12}>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            Update Supervisor
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  </Container>
  );
}
