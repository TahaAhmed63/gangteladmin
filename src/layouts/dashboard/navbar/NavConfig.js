// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

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
      { title: 'Dorm', path: PATH_DASHBOARD.dorm.dorm, icon: ICONS.mail },
      { title: 'Element', path: PATH_DASHBOARD.element.element, icon: ICONS.invoice },
      { title: 'Magic Type', path: PATH_DASHBOARD.magictype.magictype, icon: ICONS.ecommerce },
      { title: 'Tag', path: PATH_DASHBOARD.tag.tag, icon: ICONS.analytics },
      { title: 'Rarity', path: PATH_DASHBOARD.rarity.rarity, icon: ICONS.cart },
      { title: 'Spell', path: PATH_DASHBOARD.spell.spell, icon: ICONS.booking },
      { title: 'Character', path: PATH_DASHBOARD.character.character, icon: ICONS.booking },
      { title: 'Card', path: PATH_DASHBOARD.card.card, icon: ICONS.booking },
    ],
  },

];

export default navConfig;
