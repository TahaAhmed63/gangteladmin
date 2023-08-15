// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};
const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },
      { title: 'Admin', path: PATH_DASHBOARD.subadmin.subadmin, icon: ICONS.user },
      { title: 'Supervisor', path: PATH_DASHBOARD.element.element, icon: <Iconify icon="material-symbols:supervisor-account" /> },
      { title: 'Officer', path: PATH_DASHBOARD.magictype.magictype, icon: <Iconify icon="healthicons:officer" /> },
      { title: 'Gang', path: PATH_DASHBOARD.rarity.rarity, icon: <Iconify icon="pepicons-pencil:people" /> },
      // { title: 'GangMember', path: PATH_DASHBOARD.tag.tag, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Department', path: PATH_DASHBOARD.tag.tag, icon: <Iconify icon="mingcute:department-fill" /> },
    ],
  },

];

export default navConfig;
