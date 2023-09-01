import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import ProfileUpdate from '../pages/dashboard/GangMember/ProfileUpdate';
import AddPosition from '../pages/dashboard/Position/AddPosition';
import Position from '../pages/dashboard/Position/Position';


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([

    { path: '/', element: <Home/> },
    { path: '/login/admin', element: <Login/> },
    { path: '/login/subadmin', element: <SubAdminlogin/> },
    { path: '/login/supervisor', element: <Supervisorlogin/> },
    { path: '/login/officer', element: <Officerlogin/> },
    { path: '/login/member', element: <Memberlogin/> },
    { path: '/reset-passsword', element: <ResetPassword /> },
    { path: '/verify', element: <VerifyCode /> },
    {
          path: 'dashboard',
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [

            // { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
            { element: <GeneralAnalytics /> ,index:true },
            { path: 'subadmin', element: <SubAdmin /> },
            { path: 'editsubadmin/:id', element: <EditSubAdmin /> },
            { path: 'addsubadmin', element: <AddSubAdmin /> },
            { path: 'supervisor', element: <Supervisor /> },
            { path: 'editsupervisor/:id', element: <EditSupervisor /> },
            { path: 'addsupervisor', element: <AddSupervisor /> },
            { path: 'officer', element: <Officer /> },
            { path: 'editofficer/:id', element: <EditOfficer /> },
            { path: 'addofficer', element: <AddOfficer /> },
            { path: 'department', element: <Department/> },
            { path: 'editdepartment/:id', element: <EditDepartment /> },
            { path: 'adddepartment', element: <AddDepartment /> },
            { path: 'gang', element: <Gang /> },
            { path: 'addgang', element: <AddGang /> },
            { path: 'position', element: <Position /> },
            { path: 'addposition', element: <AddPosition /> },
            { path: 'gangchapter/:id', element: <Chapter /> },
            { path: 'member', element: <Members /> },
            { path: 'addmember', element: <AddMember /> },
            { path: 'editmember/:id', element: <EditMember /> },
            { path: 'vehicle', element: <Vehicle /> },
            { path: 'addvehicle', element: <AddVehicle /> },
            { path: 'editvehicle/:id', element: <EditVehicle /> },
            { path: 'update/:id', element: <ProfileUpdate /> },
            { path: 'user/profile/:id', element: <UserProfile /> },
          ],
    },
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" replace /> },

  ]);
}

// AUTHENTICATION
const Home = Loadable(lazy(() => import('../pages/dashboard/Home/Home')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const SubAdminlogin = Loadable(lazy(() => import('../pages/auth/SubAdminlogin')));
const Supervisorlogin = Loadable(lazy(() => import('../pages/auth/Supervisorlogin')));
const Officerlogin = Loadable(lazy(() => import('../pages/auth/Officerlogin')));
const Memberlogin = Loadable(lazy(() => import('../pages/auth/Memberlogin')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));


const SubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/SubAdmin')));
const EditSubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/EditSubAdmin')));
const AddSubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/AddSubAdmin')));

const Supervisor = Loadable(lazy(() => import('../pages/dashboard/Supervisor/Supervisor')));
const EditSupervisor = Loadable(lazy(() => import('../pages/dashboard/Supervisor/EditSupervisor')));
const AddSupervisor = Loadable(lazy(() => import('../pages/dashboard/Supervisor/AddSupervisor')));

const Officer = Loadable(lazy(() => import('../pages/dashboard/Officer/Officer')));
const EditOfficer = Loadable(lazy(() => import('../pages/dashboard/Officer/EditOfficer')));
const AddOfficer = Loadable(lazy(() => import('../pages/dashboard/Officer/AddOfficer')));

const Department = Loadable(lazy(() => import('../pages/dashboard/Department/Department')));
const EditDepartment = Loadable(lazy(() => import('../pages/dashboard/Department/EditDepartment')));
const AddDepartment = Loadable(lazy(() => import('../pages/dashboard/Department/AddDepartment')));

const Gang = Loadable(lazy(() => import('../pages/dashboard/Gang/Gang')));
const Chapter = Loadable(lazy(() => import('../pages/dashboard/chapter/Chapter')));
const AddGang = Loadable(lazy(() => import('../pages/dashboard/Gang/AddGang')));

const Members = Loadable(lazy(() => import('../pages/dashboard/GangMember/Members')));
const EditMember = Loadable(lazy(() => import('../pages/dashboard/GangMember/EditMember')));
const AddMember = Loadable(lazy(() => import('../pages/dashboard/GangMember/AddMember')));


const Vehicle = Loadable(lazy(() => import('../pages/dashboard/Vehicle/Vehicle')));
const EditVehicle = Loadable(lazy(() => import('../pages/dashboard/Vehicle/EditVehicle')));
const AddVehicle = Loadable(lazy(() => import('../pages/dashboard/Vehicle/AddVehicle')));

const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));

// const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
// const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
// const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// // ECOMMERCE
// const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
// const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
// const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
// const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
// const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// // INVOICE
// const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
// const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// // APP
// const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
// const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// // MAIN
// const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
 const NotFound = Loadable(lazy(() => import('../pages/Page404')));
