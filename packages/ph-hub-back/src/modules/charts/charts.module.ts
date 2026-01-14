import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { OpponentTypeEntityEntity } from '../database/entities/opponent-type.entity';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OpponentTypeEntityEntity])],
  providers: [ChartsService],
  controllers: [ChartsController],
  exports: [ChartsService],
})
export class ChartsModule {}
