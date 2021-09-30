import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { ScrappersModule } from './scrappers/scrappers.module';

@Module({
  imports: [ScheduleModule.forRoot(), ScrappersModule],
})
export class TasksModule {}
