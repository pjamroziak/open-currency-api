import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ConfigModule } from '@nestjs/config';
import { EcbScrapper } from './ecb/ecb.scrapper';

@Module({
  imports: [ConfigModule],
  providers: [EcbScrapper],
  exports: [EcbScrapper],
})
export class ScrappersModule {}
