/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

// form
import { useMemo, useCallback, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Container, Typography, Box, Autocomplete, Chip, TextField } from '@mui/material';
import { FormSelect } from 'react-bootstrap';
import { profileupdateschema, getProfileupdatevalues } from '../AllSchema/gangmember';

import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
  RHFUploadMultiFile,
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0),
}));

export default function ProfileUpdate() {
  const [gangid, setGangid] = useState();
  const [Gangchapterid, setGangchapterid] = useState();
  const [positionid, setPositionid] = useState();
  const [genders, setGender] = useState();
  const [chapters, setChapters] = useState([]);
  const [date, setDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    gang: { gangs },
    position: { positions },
    member: { members },
  } = useSelector((state) => state);

  console.log(members, 'scs');

  const defaultValues = useMemo(() => getProfileupdatevalues());

  const methods = useForm({
    resolver: yupResolver(profileupdateschema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors, '==============');

  const getGangId = (e) => {
    setGangid(e.target.value);
  };

  useEffect(() => {
    getChapters();
  }, [gangid]);

  const getChapters = async () => {
    try {
      const response = await axios.get(`admin/gangchapter?gang_id=${gangid}`);
      setChapters(response.data.gang_chapters);
    } catch (error) {
      console.log(error, 'chapter--->>>>');
    }
  };

  const OnSubmit = async (data) => {
    console.log(data);
    console.log(data?.recent_picture);

    try {
      const profile = new FormData();
      profile.append('gang_id', gangid);
      profile.append('gang_chapter_id', Gangchapterid);
      profile.append('gang_position_id', positionid);
      profile.append('first_name', data?.first_name);
      profile.append('middle_name', data?.middle_name);
      profile.append('last_name', data?.last_name);
      profile.append('gang_aka', data?.gang_aka);
      profile.append('dob', date);
      profile.append('address_state', data?.state);
      profile.append('address', data?.address);
      profile.append('address_city', data?.city);
      profile.append('address_zip', data?.zip);
      profile.append('phone_number', data?.phone);
      profile.append('email', data?.email);
      profile.append('facebook', data?.facebook);
      profile.append('instagram', data?.instagram);
      profile.append('twitter', data?.twitter);
      profile.append('linkdin', data?.linkdin);
      profile.append('driver_license_number', data?.driving_licesnes_number);
      profile.append('driver_license_state', data?.driving_licesnes_state);
      profile.append('sbi_number', data?.sbi_number);
      profile.append('sbi_number_state', data?.sbi_number_state);
      profile.append('fbi_number', data?.fbi_number);
      profile.append('gender', genders);
      profile.append('height', data?.height);
      profile.append('weight', data?.weight);
      profile.append('old_lady', data?.old_lady);
      data?.associates?.map((e, i) => profile.append(`associates[${i}]`, e.id));
      profile.append('officer_safety', data?.officer_saftey);
      data?.recent_pictrue?.map((e, i) => profile.append(`recent_picture[${i}]`, e));
      profile.append('notes', data?.notes);
      profile.append('prior_charges', data?.prior_charges);
      profile.append('dmv_image', data?.dmv_image);
      await axios
        .post(`admin/customer/detail/${id}`, profile)
        .then((response) => {
          console.log(response, "porfile udate")
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            reset();
            navigate(PATH_DASHBOARD.gangmember.member);
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
          'dmv_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const values = watch();

  const handleDrop2 = useCallback(
    (acceptedFiles) => {
      setValue(
        'recent_pictrue',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('recent_pictrue', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('recent_pictrue', filteredItems);
  };
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Update Customer Profile" links={[{ name: '', href: '' }]} />
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4} sx={{ ml: 0 }}>
                    <Stack spacing={6}>
                      <FormSelect
                        name="gang_id"
                        label="Select Gang"
                        className="bg-transparent text-light py-3"
                        onChange={(e) => getGangId(e)}
                      >
                        <option value="Select Gang" className="bg-dark">
                          Select Gang
                        </option>
                        {gangs?.map((e) => (
                          <option key={e?.id} value={e?.id} className="bg-dark">
                            {`${e?.name}`}
                          </option>
                        ))}
                      </FormSelect>
                      <RHFTextField name="first_name" label="First Name" focused />
                      <RHFTextField name="gang_aka" label="Gang_aka" focused />
                      <RHFTextField name="city" label="City" focused />
                      <RHFTextField name="phone" label="Phone Number" focused />
                      <RHFTextField name="driving_licesnes_number" label="Driving Licesnes Nubmber" focused />
                      <RHFTextField name="sbi_number" label="SBI Number" focused />
                      <FormSelect
                        name="gender"
                        label="Select gender"
                        className="bg-transparent text-light py-3"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Select chapters" className="bg-dark">
                          Select Gender
                        </option>
                        <option value="Male" className="bg-dark">
                          Male
                        </option>
                        <option value="Female" className="bg-dark">
                          Female
                        </option>
                        <option value="Other" className="bg-dark">
                          Other
                        </option>
                      </FormSelect>
                      <RHFTextField name="prior_charges" label="prior_charges" focused />

                      <RHFTextField name="twitter" label="Twitter Link" focused />

                      <RHFTextField name="linkdin" label="Linkdin Link" focused />
                    </Stack>
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ ml: 0 }}>
                    <Stack spacing={6}>
                      <FormSelect
                        name="gangchapter_id"
                        label="Select Gang Chapter"
                        className="bg-transparent text-light py-3"
                        onChange={(e) => setGangchapterid(e.target.value)}
                      >
                        <option value="Select chapters" className="bg-dark">
                          Select chapters
                        </option>
                        {chapters?.map((e) => (
                          <option key={e?.id} value={e?.id} className="bg-dark">
                            {`${e?.name}`}
                          </option>
                        ))}
                      </FormSelect>
                      <RHFTextField name="middle_name" label="Middle Name" focused />
                      <input
                        type="date"
                        name="Dob"
                        label="D.O.B"
                        focused
                        onChange={(e) => setDate(e.target.value)}
                        className="p-3 bg-transparent rounded text-light"
                      />
                      <RHFTextField name="state" label="State" focused />
                      <RHFTextField name="email" label="Email" focused />
                      <RHFTextField name="driving_licesnes_state" label="Driving Licesnes State" focused />
                      <RHFTextField name="sbi_number_state" label="SBI Number State" focused />
                      <RHFTextField name="height" label="Height" focused />
                      <RHFTextField name="notes" label="Notes" focused />
                      <RHFTextField name="facebook" label="Facebook Link" focused />
                      <RHFTextField name="instagram" label="Instagram Link" focused />
                    </Stack>
                  </Grid>
                  <Grid item xs={6} md={4} sx={{ ml: 0, mt: 0 }}>
                    <Stack spacing={6}>
                      <FormSelect
                        name="position_id"
                        label="Select Position"
                        className="bg-transparent text-light py-3"
                        onChange={(e) => setPositionid(e.target.value)}
                      >
                        <option value="Select Position" className="bg-dark">
                          Select Position
                        </option>
                        {positions?.map((e) => (
                          <option key={e?.id} value={e?.id} className="bg-dark">
                            {`${e?.name}`}
                          </option>
                        ))}
                      </FormSelect>
                      <RHFTextField name="last_name" label="Last Name" focused />
                      <RHFTextField name="address" label="Address" focused />
                      <RHFTextField name="zip" label="ZIP Code" focused />
                      <RHFTextField name="fbi_number" label="FBI Number" focused />
                      <RHFTextField name="weight" label="Weight" focused />
                      <Controller
                        name="associates"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            multiple
                            freeSolo
                            onChange={(event, newValue) => {
                              field.onChange(newValue);
                              console.log(newValue.id, 'cmskcnskc');
                            }}
                            options={members.map((option) => ({ id: option.id, name: option.first_name }))}
                            getOptionLabel={(option) => option.name} // Display name in the dropdown
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option.id} size="small" label={option.name} />
                              ))
                            }
                            renderInput={(params) => <TextField label="Associates" {...params}   focused/>}
                          />
                        )}
                      />
                      <RHFTextField name="officer_saftey" label="Officer Saftey" focused />
                      <RHFTextField name="old_lady" label="Old Lady" focused />
                    </Stack>
                    <Stack spacing={3}>
                      <Card sx={{ py: 6, px: 2, mt: 5 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            DMV Picture
                          </Typography>
                          <RHFUploadAvatar
                            name="dmv_image"
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
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} sx={{ ml: 0, position: 'relative', bottom: 100 }}>
                    <LabelStyle>Images</LabelStyle>
                    <RHFUploadMultiFile
                      name="recent_pictrue"
                      showPreview
                      accept="image/*"
                      maxSize={3145728}
                      onDrop={handleDrop2}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                    />
                  </Grid>

                  <Grid item xs={4} md={8}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isSubmitting}
                      sx={{ width: '100%', mt: '0' }}
                    >
                      Update Profile
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
