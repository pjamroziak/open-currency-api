import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultConfig from './configs/default.config';
import { DatabasesModule } from './databases/databases.module';
import { TasksModule } from './tasks/tasks.module';
import { Version_1_Module } from './v1/version.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [defaultConfig],
    }),
    DatabasesModule,
    Version_1_Module,
    TasksModule,
  ],
})
export class AppModule {}
