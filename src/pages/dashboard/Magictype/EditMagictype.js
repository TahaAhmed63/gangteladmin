import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container, } from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFDescription,
} from '../../../components/hook-form';



export default function EditMagictype() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { magictypes } = useSelector((state) => state.magictype);

  const currentMagictype = magictypes.find((magictype) =>magictype.id === +(id))

  const NewMagictypeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:   currentMagictype?.name || '',
      description:  currentMagictype?.desc ||  '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewMagictypeSchema),
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
      const magictype=new URLSearchParams();
      magictype.append('name',formValues?.name)
      magictype.append('desc',formValues?.description)
   
      await axios.put(`magic-type/${id}`,magictype)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
        navigate(PATH_DASHBOARD.magictype.magictype);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };
  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      OnSubmit(methods.getValues()); // Call the onSubmit function
    }
  };
  return (
    <Container maxWidth='sm'>
    <HeaderBreadcrumbs
      heading="Edit magictype"
      links={[
        { name:'', href:''},]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label=" Name" focused/>

              <div>
                <RHFDescription name="description" label="description" onKeyPress={handlePasswordKeyPress} focused />
              </div>

            
              <Grid item xs={6} md={6}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
            Update magictype
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
