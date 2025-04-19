export const apiEndpoints = {
  services: {
    getAll: `/api/v1/services`,
    delete: (id: string) => `/api/services/${id}`,
    add: `/api/v1/services`,
    edit: (id: string) => `/api/services/${id}`,
    addVendorService: `/api/v1/services/vendor`,
  },
  tags: {
    getAll: `/api/v1/tags`,
    delete: (id: string) => `/api/tags/${id}`,
    add: `/api/v1/tags`,
    edit: (id: string) => `/api/tags/${id}`,
    addVendorTag: `/api/v1/tags/vendor`,
  },
  auth: {
    login: `/api/v1/auth/login`,
    logout: `/api/v1/auth/logout`,
    check: `/api/v1/auth/check`,
    register: `/api/v1/auth/register`,
    verifyOtp: `/api/v1/auth/verify-otp`,
  },
  users: {
    me: `/api/v1/users/me`,
    editProfile: `/api/v1/users/me`,
    getAll: `/api/v1/users`,
    createAddress: `/api/v1/addresses`,
    loginHistory: `/api/v1/users/login-history`,
    toggleActive: (id: string) => `/api/v1/users/toggle-active/${id}`,
  },
  projects: {
    get: (id: string) => `/api/v1/projects/${id}`,
    getAll: `/api/v1/projects`,
    add: `/api/v1/projects`,
    edit: (id: string) => `/api/v1/projects/${id}`,
    delete: (id: string) => `/api/v1/projects/${id}`,
  },
  notifications: {
    getAll: `/api/v1/notifications`,
    markAsRead: `/api/v1/notifications`,
  },
  dashboard: {
    getData: `/api/v1/dashboard`,
  },
  addresses: {
    getAddresses: `/api/v1/addresses`,
  },
};
