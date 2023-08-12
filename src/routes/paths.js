// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_LOGIN = '/';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ROLE_LOGIN = '/login';

// ----------------------------------------------------------------------

export const PATH_LOGIN = {
  root: ROOTS_LOGIN,
  loginUnprotected: path(ROOTS_LOGIN, '/login-unprotected'),
  registerUnprotected: path(ROOTS_LOGIN, '/register-unprotected'),
  verify: path(ROOTS_LOGIN, '/verify'),
  resetPassword: path(ROOTS_LOGIN, '/reset-password'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};
export const PATH_ROLE_LOGIN = {
  root: ROOTS_ROLE_LOGIN,
  admin: path(ROOTS_ROLE_LOGIN, '/admin'),
  subadmin: path(ROOTS_ROLE_LOGIN, `/subadmin`),
  supervisor: path(ROOTS_ROLE_LOGIN, '/supervisor'),
  officer: path(ROOTS_ROLE_LOGIN, '/officer'),
  member: path(ROOTS_ROLE_LOGIN, '/member'),
  register: path(ROOTS_ROLE_LOGIN, '/register'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  // login: {
  //   admin: path(ROOTS_LOGIN, '/login/admin'),
  //   subadmin: path(ROOTS_LOGIN, `/login/subadmin`),
  //   supervisor: path(ROOTS_LOGIN, '/login/supervisor'),
  //   officer: path(ROOTS_LOGIN, '/login/officer'),
  //   member: path(ROOTS_LOGIN, '/login/member'),
  // },
  subadmin: {
    app: path(ROOTS_DASHBOARD, '/'),
    subadmin: path(ROOTS_DASHBOARD, '/subadmin'),
    editsubadmin: (id) => path(ROOTS_DASHBOARD, `/editsubadmin/${id}`),
    addsubadmin: path(ROOTS_DASHBOARD, '/addsubadmin'),
  },
  element: {
    app: path(ROOTS_DASHBOARD, '/'),
    element: path(ROOTS_DASHBOARD, '/element'),
    editelement: (id) => path(ROOTS_DASHBOARD, `/editelement/${id}`),
    addelement: path(ROOTS_DASHBOARD, '/addelement'),
  },
  magictype: {
    app: path(ROOTS_DASHBOARD, '/'),
    magictype: path(ROOTS_DASHBOARD, '/magictype'),
    editmagictype: (id) => path(ROOTS_DASHBOARD, `/editmagictype/${id}`),
    addmagictype: path(ROOTS_DASHBOARD, '/addmagictype'),
  },
  tag: {
    app: path(ROOTS_DASHBOARD, '/'),
    tag: path(ROOTS_DASHBOARD, '/tag'),
    edittag: (id) => path(ROOTS_DASHBOARD, `/edittag/${id}`),
    addtag: path(ROOTS_DASHBOARD, '/addtag'),
  },
  rarity: {
    app: path(ROOTS_DASHBOARD, '/'),
    rarity: path(ROOTS_DASHBOARD, '/rarity'),
    editrarity: (id) => path(ROOTS_DASHBOARD, `/editrarity/${id}`),
    addrarity: path(ROOTS_DASHBOARD, '/addrarity'),
  },
  spell: {
    app: path(ROOTS_DASHBOARD, '/'),
    spell: path(ROOTS_DASHBOARD, '/spell'),
    editspell: (id) => path(ROOTS_DASHBOARD, `/editspell/${id}`),
    addspell: path(ROOTS_DASHBOARD, '/addspell'),
    spelleffect:(id) => path(ROOTS_DASHBOARD, `/spelleffect/${id}`),
  },
  character: {
    app: path(ROOTS_DASHBOARD, '/'),
    character: path(ROOTS_DASHBOARD, '/character'),
    editcharacter: (id) => path(ROOTS_DASHBOARD, `/editcharacter/${id}`),
    addcharacter: path(ROOTS_DASHBOARD, '/addcharacter'),
  },
  card: {
    app: path(ROOTS_DASHBOARD, '/'),
    card: path(ROOTS_DASHBOARD, '/card'),
    editcard: (id) => path(ROOTS_DASHBOARD, `/editcard/${id}`),
    addcard: path(ROOTS_DASHBOARD, '/addcard'),
  },






  general: {
    app: path(ROOTS_DASHBOARD, '/'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  // blog: {
  //   root: path(ROOTS_DASHBOARD, '/blog'),
  //   posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //   new: path(ROOTS_DASHBOARD, '/blog/new'),
  //   view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  //   demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  // },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
