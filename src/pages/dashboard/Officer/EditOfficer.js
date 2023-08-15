import React, { useEffect, useState ,useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, Container } from '@mui/material';
import axios from '../../../utils/axios';
import { getelements } from '../../../redux/slices/element';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {OfficerSchema,getDefaultValues} from '../AllSchema/OfficerSchema'
import { useDispatch, useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFTextField,
  RHFSelect
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const TAGS_OPTION = []; 

export default function EditOfficer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [numFields, setNumFields] = useState();
  const { magictypes } = useSelector((state) => state.magictype);
  const { elements } = useSelector((state) => state.element);
  const { products } = useSelector((state) => state.product);

  const currentOfficer = magictypes.find((magictype) => magictype.id === +(id))
  console.log(currentOfficer)
  const defaultValues = useMemo(() => getDefaultValues(currentOfficer), [currentOfficer]);

  const methods = useForm({
    resolver: yupResolver(OfficerSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting}
  } = methods;

  const onSubmit = async () => {
    const formValues = getValues();
    try {
      const officer = new FormData();
      officer.append('last_name', formValues?.fname);
      officer.append('first_name', formValues?.lname);
      officer.append('email', formValues?.email);
      officer.append('password', formValues?.password);
      officer.append('supervisor_id', formValues?.supervisor_id);
      officer.append('subadmin_id', formValues?.subadmin_id);
      officer.append('_method', 'PUT');
    
      await axios.post(`admin/officer/${id}`, officer).then((response) => { 
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          reset();
          navigate(PATH_DASHBOARD.officer.officer);
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, { 
        variant: 'error'
      });
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Officer" links={[{ name: '', href: '' }]} />

      <Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
            <Grid container spacing={1}>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
            <Stack spacing={3}>
              <RHFTextField name="fname" label="First Name"  focused />
              <RHFTextField name="email" label="Email" focused/>
            </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
            <Stack spacing={3}>
              <RHFTextField name="lname" label="Last Name" focused/>
              <RHFTextField name="password" label="Password" focused/>
            </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0,mt:2 }}>
              <Stack spacing={6}>
              <RHFSelect name="subadmin_id" label="Select subadmin" focused>
                <option value='Select subadmin'>Select Sub Admin</option>
                  {products?.map((e) =>
                  <option key={e?.id} value={e?.id}>
                  {`${e?.first_name} ${e?.last_name}`}
                  </option>
                )}
              </RHFSelect>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0,mt:2}}>
              <Stack spacing={6}>
              <RHFSelect name="supervisor_id" label="Select Supervisor" focused>
              <option value='Select Supervisor'>Select Supervisor</option>
                {elements?.map((e) =>
                <option key={e?.id} value={e?.id}>
                {`${e?.first_name} ${e?.last_name}`}
                                    </option>
              )}
            </RHFSelect>
              </Stack>
            </Grid>
            
            </Grid>
              <Grid item xs={4} md={4}>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Update Officer
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
