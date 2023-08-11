import * as Yup from 'yup';

export  const NewCharacterSchema = Yup.object().shape({
    name: Yup.string().required('HP Formula is required'),
    hpFormula: Yup.string().required('HP Formula is required'),
    atkFormula: Yup.string().required('Attack Formula is required'),
    hpModifier: Yup.string().required('HP Modifier is required'),
    atkModifier: Yup.string().required('Attack Modifier is required'),
    dorm: Yup.string().required('Select an dorm'),
    magictype: Yup.string().required('Select an dorm'),
    rarity: Yup.string().required('Select an Rarity'),
    cg_image:  Yup.mixed('CG Thumbnail is required'),
    groovy_image:  Yup.mixed('Groovy Thumbnail is required'),
    no_tag: Yup.array()
    .min(1, 'At least one tag is required')
    .required('Select at least one tag'),
    no_spell: Yup.array().min(1)
    .test({message:'Cannot select more than 3 spells',test: (value) => (value?.length  > 0 && value?.length <= 3)})
    .required('At least one spell is required'),
    stateFormula: Yup.array().of(
      Yup.object().shape({
        level: Yup.string().required('Level  is required'),
        hp: Yup.string().required('HP is required'),
        atk: Yup.string().required('Attack is required'),
      })
    )
  });

  export   const getDefaultValues = (numFields) => ({
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    name: '',
    hpFormula: '',
    atkFormula: '',
    hpModifier: '',
    atkModifier: '',
    dorm: '',
    magictype: '',
    cg_image: null,
    groovy_image: null,
    rarity: '',
    no_spell: [],
    no_tag: [],
    stateFormula: Array.from({ length: numFields }).fill({
      level: '',
      hp: '',
      atk: ''
    })
  })