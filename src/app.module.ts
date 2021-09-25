import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import defaultConfig from './configs/default.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [defaultConfig],
    }),
  ],
})
export class AppModule {}
