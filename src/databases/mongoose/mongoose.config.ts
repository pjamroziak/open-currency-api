import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { DatabaseConfig } from '../../configs/default.config';

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
  readonly #dbUri: string;

  constructor(configService: ConfigService) {
    const databaseConfig: DatabaseConfig =
      configService.get<DatabaseConfig>('database');

    this.#dbUri = databaseConfig.uri;
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.#dbUri,
    };
  }
}

export default MongooseConfigService;
