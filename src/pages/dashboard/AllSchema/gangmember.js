import * as Yup from 'yup';

 export const MemberSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters'),
    supervisor_id: Yup.string().required('Select an Supervisor'),
    subadmin_id: Yup.string().required('Select an Sub Admin'),
    officer_id: Yup.string().required('Select an Officer'),
  });


  export   const getDefaultValues = (currentMember) => ({
   
    fname: currentMember?.first_name ||  '',
    lname: currentMember?.last_name || '',
    email: currentMember?.email || '',
    password: currentMember?.password || '',
    supervisor_id: currentMember?.supervisor?.id || '',
    subadmin_id: currentMember?.subadmin_id || '',
    officer_id: currentMember?.officer?.id || '',
  })

