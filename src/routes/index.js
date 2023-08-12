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
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';


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
    {
          path: 'dashboard',
          element: (
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          ),
          children: [

            { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
            { path: 'home', element: <GeneralAnalytics /> },
            { path: 'subadmin', element: <SubAdmin /> },
            { path: 'editsubadmin/:id', element: <EditSubAdmin /> },
            { path: 'addsubadmin', element: <AddSubAdmin /> },
            { path: 'element', element: <Element /> },
            { path: 'editelement/:id', element: <EditElement /> },
            { path: 'addelement', element: <AddElement /> },
            { path: 'magictype', element: <Magictype /> },
            { path: 'editmagictype/:id', element: <EditMagictype /> },
            { path: 'addmagictype', element: <AddMagictype /> },
            { path: 'tag', element: <Tag/> },
            { path: 'edittag/:id', element: <EditTag /> },
            { path: 'addtag', element: <AddTag /> },
            { path: 'rarity', element: <Rarity /> },
            { path: 'editrarity/:id', element: <EditRarity /> },
            { path: 'addrarity', element: <AddRarity /> },
             { path: 'spell', element: <Spell /> },
             { path: 'editspell/:id', element: <EditSpell /> },
             { path: 'addspell', element: <AddSpell /> },
             { path: 'spelleffect/:id', element: <Effect/> },
             { path: 'card', element: <Card /> },
            { path: 'editcard/:id', element: <EditCard /> },
            { path: 'addcard', element: <AddCard /> },
             { path: 'character', element: <Character /> },
            { path: 'editcharacter/:id', element: <EditCharacter /> },
            { path: 'addcharacter', element: <AddCharacter /> },



        //     { path: 'ecommerce', element: <GeneralEcommerce /> },
            
        //     { path: 'banking', element: <GeneralBanking /> },
        //     { path: 'booking', element: <GeneralBooking /> },
    
        //     {
        //       path: 'e-commerce',
        //       children: [
        //         { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
        //         { path: 'shop', element: <EcommerceShop /> },
        //         { path: 'product/:name', element: <EcommerceProductDetails /> },
        //         { path: 'list', element: <EcommerceProductList /> },
        //         { path: 'product/new', element: <EcommerceProductCreate /> },
        //         { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
        //         { path: 'checkout', element: <EcommerceCheckout /> },
        //       ],
        //     },
           ],
         },

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
// const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));


const SubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/SubAdmin')));
const EditSubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/EditSubAdmin')));
const AddSubAdmin = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/AddSubAdmin')));

const Element = Loadable(lazy(() => import('../pages/dashboard/Element/Element')));
const EditElement = Loadable(lazy(() => import('../pages/dashboard/Element/EditElement')));
const AddElement = Loadable(lazy(() => import('../pages/dashboard/Element/AddElement')));

const Magictype = Loadable(lazy(() => import('../pages/dashboard/Magictype/Magictype')));
const EditMagictype = Loadable(lazy(() => import('../pages/dashboard/Magictype/EditMagictype')));
const AddMagictype = Loadable(lazy(() => import('../pages/dashboard/Magictype/AddMagictype')));

const Tag = Loadable(lazy(() => import('../pages/dashboard/Tag/Tag')));
const EditTag = Loadable(lazy(() => import('../pages/dashboard/Tag/EditTag')));
const AddTag = Loadable(lazy(() => import('../pages/dashboard/Tag/AddTag')));

const Rarity = Loadable(lazy(() => import('../pages/dashboard/Rarity/Rarity')));
const EditRarity = Loadable(lazy(() => import('../pages/dashboard/Rarity/EditRarity')));
const AddRarity = Loadable(lazy(() => import('../pages/dashboard/Rarity/AddRarity')));

const Spell = Loadable(lazy(() => import('../pages/dashboard/Spell/Spell')));

const EditSpell = Loadable(lazy(() => import('../pages/dashboard/Spell/EditSpell')));
const AddSpell = Loadable(lazy(() => import('../pages/dashboard/Spell/AddSpell')));
const Effect = Loadable(lazy(() => import('../pages/dashboard/Spell/Effect')));

const Card = Loadable(lazy(() => import('../pages/dashboard/Card/Card')));
const EditCard = Loadable(lazy(() => import('../pages/dashboard/Card/EditCard')));
const AddCard = Loadable(lazy(() => import('../pages/dashboard/Card/AddCard')));

const Character = Loadable(lazy(() => import('../pages/dashboard/Character/Character')));
const EditCharacter = Loadable(lazy(() => import('../pages/dashboard/Character/EditCharacter')));
const AddCharacter = Loadable(lazy(() => import('../pages/dashboard/Character/AddCharacter')));

const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// // INVOICE
// const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// // USER
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
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
// const NotFound = Loadable(lazy(() => import('../pages/Page404')));
