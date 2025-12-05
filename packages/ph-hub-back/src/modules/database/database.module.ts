import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';

@Module({
  exports: [TypeOrmModule],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST', 'localhost'),
          port: configService.get('DATABASE_PORT', 5432),
          username: configService.get('DATABASE_USER', 'pokerhero'),
          password: configService.get(
            'DATABASE_PASSWORD',
            'pokerhero_password',
          ),
          database: configService.get('DATABASE_NAME', 'pokerhero_db'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/../**/*.migrations{.ts,.js}'],
          migrationsRun: true,
        };
      },
    }),
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
})
export class DatabaseModule {}