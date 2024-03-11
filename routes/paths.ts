// -------------npm---------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const UserTabs = Object.freeze({
  view: "view",
  security: "security",
  notification: "notification",
  "billing-plan": "billing-plan",
  connection: "connection",
});

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/signup"),
  forgotPassword: path(ROOTS_AUTH, "/forgot-password"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_PAGE = {
  page401: "/401",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
  },

  user: {
    list: path(ROOTS_DASHBOARD, "/users"),
    tab: {
      view: (id: string) => path(ROOTS_DASHBOARD, `/users/${id}/view`),
      security: (id: string) => path(ROOTS_DASHBOARD, `/users/${id}/security`),
      notification: (id: string) =>
        path(ROOTS_DASHBOARD, `/users/${id}/notification`),
      connection: (id: string) =>
        path(ROOTS_DASHBOARD, `/users/${id}/connection`),
      "billing-plan": (id: string) =>
        path(ROOTS_DASHBOARD, `/users/${id}/billing-plan`),
    },
  },
  chat: {
    general: path(ROOTS_DASHBOARD, "/chat"),
  },
  dashboard: {
    general: path(ROOTS_DASHBOARD, "/dashboards"),
  },
  department: {
    customer: path(ROOTS_DASHBOARD, "/department/customers"),
    customerDetail: (name: string) =>
      path(ROOTS_DASHBOARD, `/department/customers/detail/${name}`),
  },
  ivr: {
    root: path("", "/callcenter/ivr"),
    new: path("", "/callcenter/ivr/new"),
    edit: (slug: string) => path("", `/callcenter/ivr/${slug}/edit`),
  },
  userAccount: {
    profile: path("", "/user-profiles/profile"),
    view: (tab: string) => path("", `/user-profiles/${tab}`),
  },
  settings: {
    accountSettings: path(ROOTS_DASHBOARD, "/account-settings/account"),
  },
  call: {
    ongoingCall: path(ROOTS_DASHBOARD, "/calling"),
  },
  reports: {
    call: path(ROOTS_DASHBOARD, "/reports/call"),
  },

  numbers: {
    list: path(ROOTS_DASHBOARD, "/numbers"),
    add:path(ROOTS_DASHBOARD, "/numbers/add"),
  },
};
