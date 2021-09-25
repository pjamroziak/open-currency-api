import { Test, TestingModule } from '@nestjs/testing';
import { VersioningType } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('PingController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());

    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
    });

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('api/v1/ping (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/api/v1/ping',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual('Server is running!');
      });
  });
});
