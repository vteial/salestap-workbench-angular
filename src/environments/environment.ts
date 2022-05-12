
export const environment = {
  production: false,
  mode: 'dev',
  baseApiPrefix: 'http://localhost:8080/api',
  keycloak: {
    localhost: {
      url: 'http://localhost:9999/auth',
      realm: 'workbench',
      clientId: 'workbench-app',
    },
    workbench_angularjs_vercel_app: {
      url: 'http://localhost:9999/auth',
      realm: 'workbench',
      clientId: 'workbench-app-ngs',
    },
    workbench_angular_vercel_app: {
      url: 'http://localhost:9999/auth',
      realm: 'workbench',
      clientId: 'workbench-app-ngs',
    },
    workbench_vue_vercel_app: {
      url: 'http://localhost:9999/auth',
      realm: 'workbench',
      clientId: 'workbench-app-vue',
    }
  }
};

