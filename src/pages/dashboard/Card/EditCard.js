import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container, } from '@mui/material';
import {newCardSchema,getDefaultValues} from '../AllSchema/CardSchema';
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

export default function EditCard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const { elements } = useSelector((state) => state.element);

  const currentProduct = products.find((product) =>product.id === +(id))

  const defaultValues = useMemo(() => getDefaultValues(currentProduct));

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
      const dorm=new URLSearchParams();
      dorm.append('name',formValues?.name)
      dorm.append('desc',formValues?.description)
   
   await axios.put(`dorm/${id}`,dorm)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
        // navigate('/dashboard/dorm');
         navigate(PATH_DASHBOARD.dorm.dorm);
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
      heading="Edit Card"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label=" Name" focused/>
              <RHFTextField name="obtained" label="Obtained" focused/>
              <RHFSelect name="character" label="Select Character" focused>
                    <option value='Select character'>Select Character</option>
                      {elements?.map((category) =>
                      <option key={category?.id} value={category?.id}>
                        {category?.name}
                      </option>
                    )}
                  </RHFSelect>
              <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
            Update Card
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
