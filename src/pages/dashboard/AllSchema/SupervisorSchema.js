import * as Yup from 'yup';

 export const SupervisorSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters'),
    subadmin_id: Yup.string().required('Select an Supervisor'),
    department_id: Yup.string().required('Select an Supervisor'),
    supervisor_name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    supervisor_email: Yup.string().email('Supervisor Email must be a valid email address').required('Email is required'),
    phoneNumber: Yup.string()
    .matches(/^\d{10,}$/, 'Phone number must have at least 10 digits')
    .required('Phone number is required'),
    supervisor_phoneNumber: Yup.string()
    .matches(/^\d{10,}$/, 'Phone number must have at least 10 digits')
    .required('Phone number is required'),
  });


  export   const getDefaultValues = (currentSupervisor) => ({
    fname: currentSupervisor?.first_name ||  '',
    lname: currentSupervisor?.last_name || '',
    email: currentSupervisor?.email || '',
    password: currentSupervisor?.password || '',
    address: currentSupervisor?.supervisordetail?.address || '',
    subadmin_id: currentSupervisor?.subadmin_id || '',
    department_id: currentSupervisor?.supervisordetail?.department_id || '',
    supervisor_name: currentSupervisor?.supervisordetail?.supervisor_name ||  '',
    supervisor_email: currentSupervisor?.supervisordetail?.supervisor_email || '',
    phoneNumber: currentSupervisor?.phone || '',
    supervisor_phoneNumber: currentSupervisor?.supervisordetail?.supervisor_number  || '',
  })