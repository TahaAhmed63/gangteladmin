import * as Yup from 'yup';

 export const OfficerSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters'),
    supervisor_id: Yup.string().required('Select an Supervisor'),
    subadmin_id: Yup.string().required('Select an Sub Admin'),
  });


  export   const getDefaultValues = (currentOfficer) => ({
    fname: currentOfficer?.first_name ||  '',
    lname: currentOfficer?.last_name || '',
    email: currentOfficer?.email || '',
    password: currentOfficer?.password || '',
    supervisor_id: currentOfficer?.supervisor_id || '',
    subadmin_id: currentOfficer?.subadmin_id || '',
  })

