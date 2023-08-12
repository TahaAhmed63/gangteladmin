import * as Yup from 'yup';

 export const AdminSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters'),
  });


  export   const getDefaultValues = (currentAdmin) => ({
    fname: currentAdmin?.first_name ||  '',
    lname: currentAdmin?.last_name || '',
    email: currentAdmin?.email || '',
    password: currentAdmin?.password || '',
  })

