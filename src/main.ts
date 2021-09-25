import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { exit } from 'process';
import { AppModule } from './app.module';
import { ApplicationProperties } from './configs/default.config';
import PropertyNotFoundException from './exceptions/PropertyNotFoundException';

function getApplicationProperties(application: INestApplication) {
  const configService: ConfigService = application.get(ConfigService);

  const propertyName = 'application';
  const applicationProperties: ApplicationProperties =
    configService.get<ApplicationProperties>(propertyName);

  if (!applicationProperties) {
    throw new PropertyNotFoundException(propertyName);
  }

  return applicationProperties;
}

async function bootstrap() {
  const application: INestApplication = await NestFactory.create(AppModule);
  const applicationProperties: ApplicationProperties =
    getApplicationProperties(application);

  await application.listen(applicationProperties.port);
}

bootstrap().catch((reason) => {
  console.log(reason);
  exit(-1);
});
