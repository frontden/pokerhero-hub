import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserPreferencesEntity } from '../database/entities/user-preferences.entity';
import { OpponentTypeEntityEntity } from '../database/entities/opponent-type.entity';
import { HotkeySettingsEntity } from '../database/entities/hotkey-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPreferencesEntity,
      OpponentTypeEntityEntity,
      HotkeySettingsEntity,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
