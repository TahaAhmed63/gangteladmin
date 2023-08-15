import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo,useState,useEffect,useCallback } from 'react';
import { useForm, Controller} from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,Grid, Stack, Container,Typography,Box } from '@mui/material';
// import { getTags} from '../../../redux/slices/tag';
import { getRaritys} from '../../../redux/slices/rarity';
import { getSpells} from '../../../redux/slices/spell';
import { getProducts} from '../../../redux/slices/subadmin';
import { getmagictypes} from '../../../redux/slices/magictype';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import { useSelector,useDispatch} from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {NewCharacterSchema,getDefaultValues} from '../AllSchema/CharacterSchema'
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
  RHFSelect,
  RHFUploadAvatar
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0)
}));

export default function AddCharacter() {

  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(getSpells());
    dispatch(getRaritys());
    // dispatch(getTags());
    dispatch(getProducts());
    dispatch(getmagictypes());
  }, []);

  const customStyles = {
    control: (provided,state) => ({
      ...provided,
      paddingBottom:'2px',
      paddingTop:'2px',
      backgroundColor: '#212B36', // Change the background color
      borderColor: state.isFocused ? '#00AB55' : 'grey',    // Change the border color
      color:'white'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#161C24' : '#212B36', // Change option background color when focused
      color: 'white',
    }),
  };

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [numFields, setNumFields] = useState();
  
  const { product:{products},magictype:{magictypes},rarity:{raritys},tag:{tags},spell:{spells} } = useSelector((state) => state);
   const options = tags?.map(e => ({value: e?.id,label: e?.name}));
   const sepllsOptions = spells?.map(e => ({value: e?.id,label: e?.name}));


   const defaultValues = useMemo(() => getDefaultValues(numFields), [numFields]);

   const methods = useForm({
     resolver: yupResolver(NewCharacterSchema),
     defaultValues,
   });

  const {
    getValues,
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting},
  } = methods;
  
  const OnSubmit = async () => {
    const formValues = getValues();
    try {
      const character=new FormData();
      character.append('name',formValues?.name)
      character.append('dorm_id',formValues?.dorm)
      character.append('rarity_id',formValues?.rarity)
      character.append('magic_type_id',formValues?.magictype)
      character.append('hp_formula',formValues?.hpFormula)
      character.append('atk_formula',formValues?.atkFormula)
      character.append('g_atk_modifier',formValues?.atkModifier)
      character.append('g_hp_modifier',formValues?.hpModifier)
      character.append('cg_thumbnail',formValues?.cg_image)
      character.append('groovy_cg_thumbnail',formValues?.groovy_image)
      formValues?.no_spell?.map((e, i) => {
        character.append(`spell_id_${i+1}`, e?.value);
        return null;
      });
      formValues?.no_tag?.map((e, i) => {
        character.append(`tag[${i}][tag_id]`, e?.value);
        return null;
      });
      formValues?.stateFormula?.map((e, i) => {
        character.append(`stat_formula[${i}][level]`, e?.level);
        character.append(`stat_formula[${i}][hp_g]`, e?.hp);
        character.append(`stat_formula[${i}][atk_g]`, e?.atk);
        return null;
      });

      await axios.post("character",character)

      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.character.character)
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };

  useEffect(() => {
    methods.setValue('stateFormula', Array.from({ length: numFields }).fill({
      level: '',
      hp: '',
      atk:''
    }));
  }, [numFields, methods]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'groovy_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const handleDrop1 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cg_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Container maxWidth='md'>

    <HeaderBreadcrumbs
      heading="Add Character"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
            <RHFTextField name="name" label="Name" />
            <RHFSelect name="dorm" label="Select ">
            <option value='Select dorm'>Select Dormitory</option>
              {products?.map((e) =>
              <option key={e?.id} value={e?.id}>
                {e?.name}
              </option>
            )}
            </RHFSelect>            
            <RHFSelect name="rarity" label="Select Rarity">
            <option>Select Rarity</option>
              {raritys?.map((e) =>
              <option key={e?.id} value={e?.id}>
                {e?.name}
              </option>
            )}
            </RHFSelect>            
            <RHFSelect name="magictype" label="Select Dormitory">
            <option >Select Magic Type</option>
              {magictypes?.map((e) =>
              <option key={e?.id} value={e?.id}>
                {e?.name}
              </option>
            )}
            </RHFSelect> 

          <Grid container spacing={1}>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name="hpFormula" label="HP Formula" />
              <RHFTextField name="hpModifier" label="HP Modifier" />
              </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name="atkFormula" label="Attack Formula" />
              <RHFTextField name="atkModifier" label="Attack Modifier" />
              </Stack>
            </Grid>
          </Grid>

         
          <LabelStyle>Select Spell</LabelStyle>
          <Controller
          name='no_spell'
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}
                            components={animatedComponents}
                            isMulti
                            options={sepllsOptions}
                            onChange={(e)=>{
                              field.onChange(e)
                            }}
                            styles={customStyles}
                          />
          )}
          />

         {methods.formState.errors.no_spell && (
         <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_spell.message}</LabelStyle>
         )}
          <LabelStyle>Select Tag</LabelStyle>
          <Controller
          name='no_tag'
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}
                            components={animatedComponents}
                            isMulti
                            // value={totalSpell}
                            options={options}
                            // {...register('no_spell', { validate: value => value.length <= 3 })}
                            onChange={(e)=>{
                              field.onChange(e)
                            }}
                            styles={customStyles}
                          />
          )}
          />

          {methods.formState.errors.no_tag && (
          <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_tag.message}</LabelStyle>
          )}

          <RHFTextField value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" />
           
          {Array.from({ length: numFields }).map((_, i) => (
                  
          <Grid container spacing={1}>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].level`} label="Level" />
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].hp`} label="HP" />
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" />
              </Stack>
            </Grid>

          </Grid>
          ))}


          <Grid container spacing={1}>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <div>
          <LabelStyle>CG Thumbnail</LabelStyle>
          <RHFUploadSingleFile name='cg_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop1(acceptedFiles)}/>
          </div>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <div>
              <LabelStyle>GROOVY Thumbnail</LabelStyle>
              <RHFUploadSingleFile name='groovy_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}/>
              </div>
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Create Character
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
