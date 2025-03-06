export const apiEndpoints = {
  services: {
    getAll: `/api/v1/services`,
    delete: (id: string) => `/api/services/${id}`,
    add: `/api/v1/services`,
    edit: (id: string) => `/api/services/${id}`,
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
  },
  projects: {
    getAll: `/api/v1/projects`,
    add: `/api/v1/projects`,
    edit: (id: string) => `/api/v1/projects/${id}`,
    delete: (id: string) => `/api/v1/projects/${id}`,
  },
};
