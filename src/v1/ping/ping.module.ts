import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import PingController from './ping.controller';

@Module({
  controllers: [PingController],
})
export class PingModule {}
