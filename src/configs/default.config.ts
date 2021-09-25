import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import PropertyNotFoundException from '../exceptions/PropertyNotFoundException';

export default () => ({
  application: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
});

export interface ApplicationProperties {
  port: number;
  host: string;
}

export const getApplicationProperties = (
  application: INestApplication,
): ApplicationProperties => {
  const configService: ConfigService = application.get(ConfigService);

  const propertyName = 'application';
  const applicationProperties: ApplicationProperties =
    configService.get<ApplicationProperties>(propertyName);

  if (!applicationProperties) {
    throw new PropertyNotFoundException(propertyName);
  }

  return applicationProperties;
};
