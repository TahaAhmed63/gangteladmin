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
import {newSpellSchema,getDefaultValues} from '../AllSchema/SpellSchema'
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

export default function EditSpell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [numFields, setNumFields] = useState();
  const { spells } = useSelector((state) => state.spell);

  const currentspell = spells.find((spell) => spell.id === +(id))
  const { elements } = useSelector((state) => state.element);

  useEffect(() => {
    setNumFields(currentspell?.effect?.length);
    dispatch(getelements());
  }, [dispatch]);

  // const methods = useForm({
  //   resolver: yupResolver(newSpellSchema),
  //   defaultValues: {
  //     name: currentspell?.name || '',
  //     selectElement: currentspell?.element?.id || '',
  //     levels: Array.from({ length: numFields }).map(() => ({
  //       level: '',
  //       effect: [],
  //     })),
  //   },
  // });
 
  const defaultValues = useMemo(() => getDefaultValues(numFields,currentspell), [currentspell,numFields]);

  const methods = useForm({
    resolver: yupResolver(newSpellSchema),
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
      const spell = new URLSearchParams();
      spell.append('name', formValues?.name);
      spell.append('element_id', formValues?.selectElement);

      formValues?.levels?.map((e, i) => {
        spell.append(`spell_effect[${i}][level]`, e?.level);
        e?.effect.map((eff, j) => spell.append(`spell_effect[${i}][effect][${j}]`, eff));
        return null;
      });
      console.log(spell);
      await axios.put(`spell/${id}`, spell).then((response) => { 
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          reset();
          navigate(PATH_DASHBOARD.spell.spell);
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, { 
        variant: 'error'
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const defaultLevels = Array.from({ length: numFields }).map((_, i) => ({
      level: currentspell?.effect[i]?.level || '',
      effect: currentspell?.effect[i]?.effect || [],
    }));
  
    if (defaultLevels.length !== 0) {
      defaultLevels.forEach((e, i) => {
        methods.setValue(`levels[${i}].level`, e.level);
        methods.setValue(`levels[${i}].effect`, e.effect);
      });
    } else {
      console.log(1);
    }
  }, [numFields, methods, currentspell]);

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Spell" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="Name" focused/>

                  <RHFSelect name="selectElement" label="Select Element" focused>
                    <option value='Select Element'>Select Element</option>
                      {elements?.map((category) =>
                      <option key={category?.id} value={category?.id}>
                        {category?.name}
                      </option>
                    )}
                  </RHFSelect>

                  <RHFTextField value={numFields} focused={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many effects do you want to add to this Spell?" />
                  
                  {Array.from({ length: numFields }).map((_, i) => (
                    <div key={i}>
                      <RHFTextField name={`levels[${i}].level`}   focused
                      //  focused={!!currentspell?.effect[i]?.level} 
                       label={`Effect Level Range ${i + 1}`} sx={{ pb: 2 }}/>
                      <div>
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
                             defaultValue={currentspell?.effect[i]?.effect}
                              options={TAGS_OPTION}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                ))
                              }
                              renderInput={(params) => <TextField label="Enter Effect Tag" {...params} focused
                              //  focused={!!currentspell?.effect[i]?.effect} 
                               />}
                            />
                          )}
                        />
                        <LabelStyle fontSize={12}>Press enter to add new tag</LabelStyle>
                      </div>
                    </div>
                  ))}
                  
                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Update Spell
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
