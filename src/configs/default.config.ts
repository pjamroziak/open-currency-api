import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import PropertyNotFoundException from '../exceptions/PropertyNotFoundException';

export default () => ({
  application: {
    port: parseInt(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  scrappers: {
    ecb: {
      baseUrl: process.env.SCRAPPER_ECB_BASE_URL,
      endpoint: process.env.SCRAPPER_ECB_ENDPOINT,
    },
  },
});

export interface ApplicationProperties {
  port: number;
  host: string;
}

export interface ScrappersConfig {
  ecb: EcbScrapperConfig;
}

export interface EcbScrapperConfig {
  baseUrl: string;
  endpoint: string;
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
