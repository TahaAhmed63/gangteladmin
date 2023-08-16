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
  supervisor: {
    app: path(ROOTS_DASHBOARD, '/'),
    supervisor: path(ROOTS_DASHBOARD, '/supervisor'),
    editsupervisor: (id) => path(ROOTS_DASHBOARD, `/editsupervisor/${id}`),
    addsupervisor: path(ROOTS_DASHBOARD, '/addsupervisor'),
  },
  officer: {
    app: path(ROOTS_DASHBOARD, '/'),
    officer: path(ROOTS_DASHBOARD, '/officer'),
    editofficer: (id) => path(ROOTS_DASHBOARD, `/editofficer/${id}`),
    addofficer: path(ROOTS_DASHBOARD, '/addofficer'),
  },
  department: {
    app: path(ROOTS_DASHBOARD, '/'),
    department: path(ROOTS_DASHBOARD, '/department'),
    editdepartment: (id) => path(ROOTS_DASHBOARD, `/editdepartment/${id}`),
    adddepartment: path(ROOTS_DASHBOARD, '/adddepartment'),
  },
  gang: {
    app: path(ROOTS_DASHBOARD, '/'),
    gang: path(ROOTS_DASHBOARD, '/gang'),
    gangchapter: (id) => path(ROOTS_DASHBOARD, `/gangchapter/${id}`),
    addgang: path(ROOTS_DASHBOARD, '/addgang'),
  },
  gangmember: {
    app: path(ROOTS_DASHBOARD, '/'),
    member: path(ROOTS_DASHBOARD, '/member'),
    editmember: (id) => path(ROOTS_DASHBOARD, `/editmember/${id}`),
    addmember: path(ROOTS_DASHBOARD, '/addmember'),
  },
  // spell: {
  //   app: path(ROOTS_DASHBOARD, '/'),
  //   spell: path(ROOTS_DASHBOARD, '/spell'),
  //   editspell: (id) => path(ROOTS_DASHBOARD, `/editspell/${id}`),
  //   addspell: path(ROOTS_DASHBOARD, '/addspell'),
  // },

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
