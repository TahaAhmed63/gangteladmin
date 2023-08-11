import React, { useEffect, useState ,useCallback,useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, Container } from '@mui/material';
import axios from '../../../utils/axios';
import { getelements } from '../../../redux/slices/element';
import {newSpellSchema,getDefaultValues} from '../AllSchema/SpellSchema'
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadSingleFile
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const TAGS_OPTION = []; 

export default function AddTag() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getelements());
  }, [dispatch]);

  const [numFields, setNumFields] = useState();
  const { elements } = useSelector((state) => state.element);

  const defaultValues = useMemo(() => getDefaultValues(numFields), [numFields]);

  const methods = useForm({
    resolver: yupResolver(newSpellSchema),
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

  const handleDrop1 = useCallback(
    (acceptedFiles,index) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          `levels[${index}].image`,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  

  const onSubmit = async () => {
    const formValues = getValues();
    try {
      const spell = new FormData();
spell.append('name', formValues?.name);
spell.append('element_id', formValues?.selectElement);

formValues?.levels?.map((e, i) => {
  spell.append(`spell_effect[${i}][level]`, e?.level);
  spell.append(`spell_effect[${i}][thumbnail]`, e?.image);
  e?.effect.map((eff, j) => spell.append(`spell_effect[${i}][effect][${j}]`, eff));
  return null;
});
      
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

  useEffect(() => {
    methods.setValue('levels', Array.from({ length: numFields }).fill({
      level: '',
      effect: [],
      image: null
    }));
  }, [numFields, methods]);

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Add Spell" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="Name" />

                  <RHFSelect name="selectElement" label="Select Element">
                    <option value='Select Element'>Select Element</option>
                      {elements?.map((category) =>
                      <option key={category?.id} value={category?.id}>
                        {category?.name}
                      </option>
                    )}
                  </RHFSelect>
                  <RHFTextField value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many effects do you want to add to this Spell?" />
                  

                  {Array.from({ length: numFields }).map((_, i) => (
                    <div key={i}>
                      <RHFTextField name={`levels[${i}].level`} label={`Effect Level Range ${i + 1}`} sx={{ pb: 2 }}/>
                      
                        <Controller
                          name={`levels[${i}].effect`}
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              multiple
                              freeSolo
                              onChange={(event, newValue) => {
                                field.onChange(newValue);
                                console.log(`Effect value for level ${i}:`, newValue);
                              }}
                              options={TAGS_OPTION}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                ))
                              }
                              renderInput={(params) => <TextField label="Enter Effect Tag" {...params} />}
                            />
                          )}
                        />
                        <LabelStyle fontSize={12}>Press enter to add new tag</LabelStyle>
                      
                      <div>
                        <LabelStyle>Effect Thumbnail</LabelStyle>
                        <RHFUploadSingleFile name={`levels[${i}].image`} accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop1(acceptedFiles, i)}/>
                      </div>
                    </div>
                  ))}
                  

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

