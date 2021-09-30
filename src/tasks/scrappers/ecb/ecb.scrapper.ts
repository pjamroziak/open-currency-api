import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule/dist/decorators/cron.decorator';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';
import got from 'got/dist/source';
import { EcbScrapperConfig } from '../../../configs/default.config';
import { WebScrapper } from '../scrapper.type';
import { xml2json } from 'xml-js';
import { EcbCurrency } from './ecb.type';

@Injectable()
export class EcbScrapper implements WebScrapper {
  private logger: Logger = new Logger(EcbScrapper.name);

  private baseUrl: string;
  private endpoint: string;

  constructor(configService: ConfigService) {
    const ecbScrapperConfig: EcbScrapperConfig =
      configService.get<EcbScrapperConfig>('scrappers.ecb');

    this.baseUrl = ecbScrapperConfig.baseUrl;
    this.endpoint = ecbScrapperConfig.endpoint;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async scrap(): Promise<void> {
    const bodyResponse: string = await this.getBodyResponseFromWebsite();
    if (!bodyResponse) {
      this.logger.error(`Cannot scrap data from site: ${this.baseUrl}`);
      return;
    }

    const jsonFromXml: string = this.parseXmlToJson(bodyResponse);
    if (!jsonFromXml) {
      this.logger.error(`Cannot parse XML from site: ${this.baseUrl}`);
      return;
    }

    const ecbCurrencies: EcbCurrency[] = this.parseJsonToArray(jsonFromXml);
    if (!ecbCurrencies) {
      this.logger.error(`Cannot parse JSON from site: ${this.baseUrl}`);
      return;
    }

    // this.logger.log(JSON.stringify(ecbCurrencies));
  }

  private parseJsonToArray(json: string): EcbCurrency[] {
    try {
      this.logger.log(`Trying parse JSON to Array`);
      const jsonObject = JSON.parse(json);

      const ecbCurrencies: EcbCurrency[] = (
        jsonObject['gesmes:Envelope']['Cube']['Cube']['Cube'] as Array<any>
      ).map((item) => {
        const itemAttributes = item['_attributes'];
        return new EcbCurrency(itemAttributes.currency, itemAttributes.rate);
      });

      return ecbCurrencies;
    } catch (error: any) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }
      return null;
    }
  }

  private async getBodyResponseFromWebsite(): Promise<string | null> {
    try {
      this.logger.log(`Get data from: ${this.baseUrl}`);
      const response = await got.get(this.baseUrl + this.endpoint);

      return response.body;
    } catch (error: any) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }
      return null;
    }
  }

  private parseXmlToJson(xml: string): string | null {
    try {
      this.logger.log(`Parse XML from: ${this.baseUrl}`);

      return xml2json(xml, {
        compact: true,
      });
    } catch (error: any) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }
      return null;
    }
  }
}
