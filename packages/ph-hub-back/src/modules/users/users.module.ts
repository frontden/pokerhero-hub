import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserPreferencesEntity } from '../database/entities/user-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserPreferencesEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
