function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const AuthApiUrl = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  myAccount: "/auth/my-account",
};

const USER_PREFIX = "users";
export const UserApiUrl = {
  getUser: path(USER_PREFIX, "/get-users"),
  createUser: path(USER_PREFIX, "/"),
  getUserById: (id: string) => path(USER_PREFIX, "/" + id),
  updateUser: (id: string) => path(USER_PREFIX, "/" + id),
  deleteUser: (id: string) => path(USER_PREFIX, "/" + id),
};

const ROLE_PRIFIX = "roles";
export const RolesApiUrl = {
  role: {
    create: path(ROLE_PRIFIX, ""),
    get: path(ROLE_PRIFIX, ""),
  },
};

const REPORTS_PRIFIX = "reports";
export const ReportsApiUrl = {
  call: {
    callReports: path(REPORTS_PRIFIX, "/call-reports"),
  },
};

const NUMBER_PRIFIX = "numbers";
export const NumberApiUrl = {
  availableNumber: path(NUMBER_PRIFIX, "/available-number"),
  createPaymentIntent: path(NUMBER_PRIFIX, "/create-payment-intent"),
  purchaseNumber: path(NUMBER_PRIFIX, "/purchase-number"),
  getNumbers: path(NUMBER_PRIFIX, ""),
  deleteUser: (id: string) => path(NUMBER_PRIFIX, "/" + id),
  releaseNumber: (id: string) => path(NUMBER_PRIFIX, "/release-number/" + id),
  activeSubcription:path(NUMBER_PRIFIX,"/active-subscription")
};

const PAYMENT_PRIFIX = "payment";
export const PaymentApiUrl = {
  createPaymentIntent: path(PAYMENT_PRIFIX, "/create-payment-intent"),
};
