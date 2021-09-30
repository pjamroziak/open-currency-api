import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultConfig from './configs/default.config';
import { TasksModule } from './tasks/tasks.module';
import { Version_1_Module } from './v1/version.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [defaultConfig],
    }),
    Version_1_Module,
    TasksModule,
  ],
})
export class AppModule {}
