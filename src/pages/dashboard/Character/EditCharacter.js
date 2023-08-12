import { useSnackbar } from 'notistack';
import {useState,useEffect,useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getTags} from '../../../redux/slices/tag';
import { getRaritys} from '../../../redux/slices/rarity';
import { getSpells} from '../../../redux/slices/spell';
import { getProducts} from '../../../redux/slices/subadmin';
import { getmagictypes} from '../../../redux/slices/magictype';
import { useDispatch, useSelector } from '../../../redux/store';
import {NewCharacterSchema} from '../AllSchema/CharacterSchema'
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFSelect,RHFUploadSingleFile
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0)
}));


export default function EditCharacter() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const [numFields, setNumFields] = useState();

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

  const { product:{products},magictype:{magictypes},rarity:{raritys},tag:{tags},spell:{spells},character:{characters} } = useSelector((state) => state);

  const currentCharacter = characters?.find((character) =>character?.id === +(id))
  console.log(currentCharacter)
  const options = tags?.map(e => ({value: e?.id,label: e?.name}));
  const sepllsOptions = spells?.map(e => ({value: e?.id,label: e?.name}));

  const methods = useForm({
    resolver: yupResolver(NewCharacterSchema),
    defaultValues: {
    name: currentCharacter?.name || '',
    hpFormula: currentCharacter?.hp_formula  || '',
    atkFormula:currentCharacter?.atk_formula || '',
    hpModifier:currentCharacter?.g_hp_modifier || '',
    atkModifier:currentCharacter?.g_atk_modifier || '',
    dorm:  currentCharacter?.dorm?.id || '',
    magictype: currentCharacter?.magic_type?.id || '',
    cg_image: null,
    groovy_image: null,
    rarity: currentCharacter?.rarity?.id || '',
    no_spell: [{label:currentCharacter?.spell_one?.name,value:currentCharacter?.spell_one?.id},
      {label:currentCharacter?.spell_two?.name,value:currentCharacter?.spell_two?.id}
    ] || [],
    no_tag: currentCharacter?.character_tag?.map(e=>({label:e?.tag?.name,value:e?.tag?.id}))  || [],
    stateFormula: Array.from({ length: numFields }).fill({
      level: '',
      hp: '',
      atk: ''
    }),}
  });

  const {
    reset,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
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

      await axios.post(`character/${id}`,character)

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
    dispatch(getSpells());
    dispatch(getRaritys());
    dispatch(getTags());
    dispatch(getProducts());
    dispatch(getmagictypes());
    setNumFields(currentCharacter?.stat_formula?.length);
  }, []);

  useEffect(() => {
    const defaultStateFormula = Array.from({ length: numFields })?.map((_, i) => ({
      level: currentCharacter?.stat_formula[i]?.level || '',
      hp: currentCharacter?.stat_formula[i]?.hp_g || '',
      atk: currentCharacter?.stat_formula[i]?.atk_g || '',
    }));
  
    if (defaultStateFormula.length !== 0) {
      defaultStateFormula?.forEach((e, i) => {
        methods.setValue(`stateFormula[${i}].level`, e.level);
        methods.setValue(`stateFormula[${i}].hp`, e.hp);
        methods.setValue(`stateFormula[${i}].atk`, e.atk);
      });
    } else {
      console.log(1);
    }
  }, [numFields, methods, currentCharacter]);


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
      heading="Edit Character"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
            <RHFTextField name="name" label="Name" focused/>
            <RHFSelect name="dorm" label="Select " focused>
            <option value='Select dorm'>Select Dormitory</option>
              {products?.map((e) =>
              <option key={e?.id} value={e?.id}>
                {e?.name}
              </option>
            )}
            </RHFSelect>            
            <RHFSelect name="rarity" label="Select Rarity" focused>
            <option>Select Rarity</option>
              {raritys?.map((e) =>
              <option key={e?.id} value={e?.id}>
                {e?.name}
              </option>
            )}
            </RHFSelect>            
            <RHFSelect name="magictype" label="Select Dormitory" focused>
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
              <RHFTextField name="hpFormula" label="HP Formula" focused />
              <RHFTextField name="hpModifier" label="HP Modifier" focused/>
              </Stack>
            </Grid>
            <Grid item xs={6} md={6} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name="atkFormula" label="Attack Formula" focused/>
              <RHFTextField name="atkModifier" label="Attack Modifier" focused/>
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

          <RHFTextField focused value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" />
           
          {Array.from({ length: numFields }).map((_, i) => (
                  
          <Grid container spacing={1}>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].level`} label="Level"  focused/>
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].hp`} label="HP"  focused/>
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} sx={{ ml: 0 }}>
              <Stack spacing={2}>
              <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" focused/>
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
              Update Character
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
