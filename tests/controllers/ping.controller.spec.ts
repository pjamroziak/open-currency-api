import { Test, TestingModule } from '@nestjs/testing';
import PingController from '../../src/v1/ping/ping.controller';

describe('PingController', () => {
  let pingController: PingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    pingController = app.get<PingController>(PingController);
  });

  describe('root', () => {
    it('should return "Server is running!"', () => {
      expect(pingController.ping()).toBe('Server is running!');
    });
  });
});
