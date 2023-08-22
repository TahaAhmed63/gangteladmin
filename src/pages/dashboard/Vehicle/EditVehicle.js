import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import makeAnimated from 'react-select/animated';
import { Vehicle, getDefaultValues } from '../AllSchema/VehicleSchema';
import { fData } from '../../../utils/formatNumber';
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFUploadAvatar, RHFTextField, RHFSelect } from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0),
}));

export default function EditCard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const animatedComponents = makeAnimated();
  const { id } = useParams();

  const currentYear = new Date().getFullYear();
  const pastOfYears = 50;
  const futureOfYears = 30;

  const yearOptions = [];
  const vehicleTypes = ['Motorcyle', 'Sedan', 'SUV', 'Pick Up'];
  // eslint-disable-next-line no-plusplus
  for (let i = currentYear - pastOfYears; i <= currentYear + futureOfYears; i++) {
    yearOptions.push({ value: i, label: i });
  }
  const { vehicles } = useSelector((state) => state.vehicle);
  const { members } = useSelector((state) => state.member);
  const currentvehicle = vehicles.find((vehicle) => vehicle.id === +id);

  console.log(vehicles, 'vehicles');

  const defaultValues = useMemo(() => getDefaultValues(currentvehicle));

  const methods = useForm({
    resolver: yupResolver(Vehicle),
    defaultValues,
  });

  const {
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    try {
      const vehicle = new FormData();
      vehicle.append('registration', data?.registration);
      vehicle.append('registration_to', data?.registration_to);
      vehicle.append('color', data?.color);
      vehicle.append('model', data?.model);
      vehicle.append('make', data?.make);
      vehicle.append('type', data?.type);
      vehicle.append('registration_state', data?.state);
      vehicle.append('year', data?.year);
      vehicle.append('vin', data?.VIN);
      vehicle.append('recent_picture', data?.image);
      vehicle.append('customer_id', data?.member_id);
      // vehicle.append('_method','PUT')

      await axios
        .post('admin/vehicle', vehicle)

        .then((response) => {
          if (response?.data?.status === true) {
            reset();
            enqueueSnackbar(response?.data?.message);
            navigate(PATH_DASHBOARD.vehicle.vehicle);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Edit Vehicle" links={[{ name: '', href: '' }]} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="registration" label="Registration" />
                <RHFTextField name="registration_to" label="Registration To" />
                <RHFSelect name="type" label="Select an Vehicle Type" placeholder="Type">
                  <option value="" />
                  {vehicleTypes?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="year" label="Select an Vehicle Year" placeholder="Year">
                  <option value="" />
                  {yearOptions?.map((option) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.value}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField name="make" label="Make" />
                <RHFTextField name="model" label="Model" />
                <RHFTextField name="color" label="Color" />
                <RHFTextField name="vin" label="VIN" />

                <RHFSelect name="state" label="Select an State" placeholder="State">
                  <option value="" />
                  {yearOptions?.map((option) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.value}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="member_id" label="Select Member" focused>
                  <option value="Select Member">Select Member</option>
                  {members?.map((e) => (
                    <option key={e?.id} value={e?.id}>
                      {`${e?.first_name} ${e?.last_name}`}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ py: 6, px: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Vehicle Latest Picture
                  </Typography>
                  <RHFUploadAvatar
                    name="image"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </Box>
              </Card>

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                Update Vehicle
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
