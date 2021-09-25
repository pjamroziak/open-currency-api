import { VersioningType } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters/fastify-adapter';
import { exit } from 'process';
import { AppModule } from './app.module';
import {
  ApplicationProperties,
  getApplicationProperties,
} from './configs/default.config';

async function bootstrap() {
  const application: INestApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  application.setGlobalPrefix('api');
  application.enableVersioning({
    type: VersioningType.URI,
  });

  const applicationProperties: ApplicationProperties =
    getApplicationProperties(application);

  await application.listen(
    applicationProperties.port,
    applicationProperties.host,
  );
}

bootstrap().catch((reason) => {
  console.log(reason);
  exit(-1);
});
