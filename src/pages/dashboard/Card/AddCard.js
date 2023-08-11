import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,Grid, Stack, Container } from '@mui/material';
import {newCardSchema,getDefaultValues} from '../AllSchema/CardSchema';
import axios from '../../../utils/axios';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
} from '../../../components/hook-form';


export default function AddCard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { elements } = useSelector((state) => state.element);

  const defaultValues = useMemo(() => getDefaultValues());

  const methods = useForm({
    resolver: yupResolver(newCardSchema),
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
      const dorm=new FormData();
      dorm.append('name',formValues?.name)
      dorm.append('desc',formValues?.description)
   
      await axios.post("dorm",dorm)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.dorm.dorm)
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
      heading="Add Card"
      links={[
        { name: '', href: '' },]}/>
    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Card Name" />
              <RHFTextField name="obtained" label="Obtained" />
              <RHFSelect name="character" label="Select Character">
                    <option value='Select character'>Select Character</option>
                      {elements?.map((e) =>
                      <option key={e?.id} value={e?.id}>
                        {e?.name}
                      </option>
                    )}
              </RHFSelect>            

              <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Create Card
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
