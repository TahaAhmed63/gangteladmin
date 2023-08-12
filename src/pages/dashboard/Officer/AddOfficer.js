import React, { useEffect, useState ,useCallback,useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, Container, StepConnector } from '@mui/material';
import axios from '../../../utils/axios';
import { getelements } from '../../../redux/slices/element';
import {OfficerSchema,getDefaultValues} from '../AllSchema/OfficerSchema'
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadSingleFile
} from '../../../components/hook-form';

const TAGS_OPTION = []; 

export default function AddTag() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getelements());
  }, [dispatch]);

  const { elements } = useSelector((state) => state.element);

  const defaultValues = useMemo(() => getDefaultValues(), []);

  const methods = useForm({
    resolver: yupResolver(OfficerSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;
console.log(errors)

  const onSubmit = async () => {
    const formValues = getValues();
    try {
      const spell = new FormData();
spell.append('name', formValues?.name);
spell.append('element_id', formValues?.selectElement);

   console.log(spell)
    await axios.post("spell",spell)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.spell.spell)
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };


  return (
    <Container maxWidth="md">
      <HeaderBreadcrumbs heading="Add Officer" links={[{ name: '', href: '' }]} />

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
                <Grid item xs={6} md={6} sx={{ ml: 0,mt:2 }}>
                  <Stack spacing={6}>
                  <RHFSelect name="supervisor_id" label="Select Supervisor">
                    <option value='Select Supervisor'>Select Supervisor</option>
                      {elements?.map((e) =>
                      <option key={e?.id} value={e?.id}>
                        {e?.name}
                      </option>
                    )}
                  </RHFSelect>
                  </Stack>
                </Grid>
                <Grid item xs={6} md={6} sx={{ ml: 0,mt:2}}>
                  <Stack spacing={6}>
                  <RHFSelect name="supervisor_id" label="Select Supervisor">
                  <option value='Select Supervisor'>Select Supervisor</option>
                    {elements?.map((e) =>
                    <option key={e?.id} value={e?.id}>
                      {e?.name}
                    </option>
                  )}
                </RHFSelect>
                  </Stack>
                </Grid>
                
                </Grid>
                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Create Spell
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

