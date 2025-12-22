import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export function getDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions {
  return {
    database: configService.get('DATABASE_NAME', 'pokerhero_db'),
    host: configService.get('DATABASE_HOST', 'localhost'),
    password: configService.get('DATABASE_PASSWORD', 'pokerhero_password'),
    port: configService.get('DATABASE_PORT', 5432),
    type: 'postgres',
    username: configService.get('DATABASE_USER', 'pokerhero'),
  };
}

