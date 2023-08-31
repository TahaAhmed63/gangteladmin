import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import axios from '../../utils/axios';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { FormProvider, RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------



export default function ForgetPasswordForm() {
  // const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    code: Yup.string().required('Code is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Confirm password must match for Pasword')
      .required('Confirm password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '',code:'',password:'',confirm_password:'' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting ,errors},
  } = methods;
  console.log(errors,'errors---->>>')

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const forget = new FormData();
      forget.append('email', data?.email);
      forget.append('token', data?.code);
      forget.append('password', data?.password);
      forget.append('confirm_password', data?.confirm_password);
      await axios
        .post('admin/reset/password', forget)
        .then((response) => {
            console.log(response)
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
          }
          else{
            enqueueSnackbar(response?.data?.message);
          }
        });
    } catch (errors) {
      enqueueSnackbar(errors.errors[0], {
        variant: 'error',
      });
      console.log(errors.errors[0]);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{mt:5}}>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="code" label="Code" />
        <RHFTextField name="password" label="Password" />
        <RHFTextField name="confirm_password" label="Confirm Password" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
