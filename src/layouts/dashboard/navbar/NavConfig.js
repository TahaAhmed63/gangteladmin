// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// console.log(JSON.parse(user1))
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

  {
    items: [
      { title: 'Dashboard', path: '/dashboard/', icon: ICONS.dashboard },
      { title: 'Admin', path: PATH_DASHBOARD.subadmin.subadmin, icon: ICONS.user },
      {
        title: 'Supervisor',
        path: PATH_DASHBOARD.supervisor.supervisor,
        icon: <Iconify icon="material-symbols:supervisor-account" />,
      },
      { title: 'Officer', path: PATH_DASHBOARD.officer.officer, icon: <Iconify icon="healthicons:officer" /> },
      { title: 'Gang', path: PATH_DASHBOARD.gang.gang, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Gang Member', path: PATH_DASHBOARD.gangmember.member, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Position', path: PATH_DASHBOARD.position.position, icon: <Iconify icon="pepicons-pencil:people" /> },
      {
        title: 'Department',
        path: PATH_DASHBOARD.department.department,
        icon: <Iconify icon="mingcute:department-fill" />,
      },
      { title: 'Vehicle', path: PATH_DASHBOARD.vehicle.vehicle, icon: <Iconify icon="fa6-solid:people-line" /> },
    ],
  },
  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },
      {
        title: 'Supervisor',
        path: PATH_DASHBOARD.supervisor.supervisor,
        icon: <Iconify icon="material-symbols:supervisor-account" />,
      },
      { title: 'Officer', path: PATH_DASHBOARD.officer.officer, icon: <Iconify icon="healthicons:officer" /> },
      { title: 'Gang', path: PATH_DASHBOARD.gang.gang, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Gang Member', path: PATH_DASHBOARD.gangmember.member, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Position', path: PATH_DASHBOARD.position.position, icon: <Iconify icon="pepicons-pencil:people" /> },
      {
        title: 'Department',
        path: PATH_DASHBOARD.department.department,
        icon: <Iconify icon="mingcute:department-fill" />,
      },
      { title: 'Vehicle', path: PATH_DASHBOARD.vehicle.vehicle, icon: <Iconify icon="fa6-solid:people-line" /> },

    ],
  },
  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },

      { title: 'Officer', path: PATH_DASHBOARD.officer.officer, icon: <Iconify icon="healthicons:officer" /> },
      { title: 'Gang', path: PATH_DASHBOARD.gang.gang, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Gang Member', path: PATH_DASHBOARD.gangmember.member, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Position', path: PATH_DASHBOARD.position.position, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Vehicle', path: PATH_DASHBOARD.vehicle.vehicle, icon: <Iconify icon="fa6-solid:people-line" /> },

    ],
  },
  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },
      { title: 'Gang', path: PATH_DASHBOARD.gang.gang, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Gang Member', path: PATH_DASHBOARD.gangmember.member, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Position', path: PATH_DASHBOARD.position.position, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'Vehicle', path: PATH_DASHBOARD.vehicle.vehicle, icon: <Iconify icon="fa6-solid:people-line" /> },

    ],
  },
  // {
  //   items: [
  //     { title: 'Dashboard', path: '/dashboard/home', icon: ICONS.dashboard },
  //     { title: 'Gang Member', path: PATH_DASHBOARD.gangmember.member, icon: <Iconify icon="fa6-solid:people-line" /> },
  //     { title: 'Vehicle', path: PATH_DASHBOARD.vehicle.vehicle, icon: <Iconify icon="fa6-solid:people-car" /> },
  //   ],
  // },
];

export default navConfig;
