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
<<<<<<< HEAD
      { title: 'Dorm', path: PATH_DASHBOARD.dorm.dorm, icon: ICONS.user },
      { title: 'Supervisor', path: PATH_DASHBOARD.element.element, icon: <Iconify icon="material-symbols:supervisor-account" /> },
      { title: 'Officer', path: PATH_DASHBOARD.magictype.magictype, icon: <Iconify icon="healthicons:officer" /> },
      { title: 'Gang', path: PATH_DASHBOARD.rarity.rarity, icon: <Iconify icon="pepicons-pencil:people" /> },
      { title: 'GangMember', path: PATH_DASHBOARD.tag.tag, icon: <Iconify icon="fa6-solid:people-line" /> },
      { title: 'Department', path: PATH_DASHBOARD.spell.spell, icon: <Iconify icon="mingcute:department-fill" /> },
=======
      { title: 'Admin', path: PATH_DASHBOARD.subadmin.subadmin, icon: ICONS.mail },
      { title: 'Element', path: PATH_DASHBOARD.element.element, icon: ICONS.invoice },
      { title: 'Magic Type', path: PATH_DASHBOARD.magictype.magictype, icon: ICONS.ecommerce },
      { title: 'Tag', path: PATH_DASHBOARD.tag.tag, icon: ICONS.analytics },
      { title: 'Rarity', path: PATH_DASHBOARD.rarity.rarity, icon: ICONS.cart },
      { title: 'Spell', path: PATH_DASHBOARD.spell.spell, icon: ICONS.booking },
      { title: 'Character', path: PATH_DASHBOARD.character.character, icon: ICONS.booking },
      { title: 'Card', path: PATH_DASHBOARD.card.card, icon: ICONS.booking },
>>>>>>> b0e017f9357378e74b70d20935ef475ff57f681e
    ],
  },

];

export default navConfig;
