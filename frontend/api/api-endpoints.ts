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
  },
};
