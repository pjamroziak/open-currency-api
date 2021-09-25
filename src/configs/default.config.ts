export default () => ({
  application: {
    APP_PORT: parseInt(process.env.APP_PORT) || 3000,
    APP_HOST: process.env.APP_HOST || '0.0.0.0',
  },
});

export interface ApplicationProperties {
  port: number;
  host: number;
}
