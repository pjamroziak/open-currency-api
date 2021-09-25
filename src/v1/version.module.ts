import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [PingModule],
})
export class Version_1_Module {}
