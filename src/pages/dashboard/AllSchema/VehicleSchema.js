import * as Yup from 'yup';

export  const Vehicle = Yup.object().shape({
    registration: Yup.string().required('Registration is required'),
    registration_to: Yup.string().required('Registration To is required'),
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    vin: Yup.string().required('VIN is required'),
    color: Yup.string().required('Color is required'),
    year: Yup.string().required('Select an Registration Year'),
    type: Yup.string().required('Select an Vehicle Type'),
    state: Yup.string().required('Select an Registration State'),
    image:  Yup.mixed('Latest Image is required'),
    member_id:  Yup.string('customer is required'),
  });

  export   const getDefaultValues = (currentvehicle) => ({
    make: currentvehicle?.make || '',
    color: currentvehicle?.color ||'',
    vin: currentvehicle?.vin ||'',
    image: currentvehicle?.image || null,
    state:currentvehicle?.registration_state || '',
    type: currentvehicle?.type || '',
    year: currentvehicle?.year ||  '',
    model: currentvehicle?.model || '',
    registration:currentvehicle?.registration || '',
    registration_to: currentvehicle?.registration_to || '',
    member_id: currentvehicle?.customer_id || '',
  })