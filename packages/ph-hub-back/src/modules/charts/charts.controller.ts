import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ChartsService } from './charts.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { OpponentType } from '@ph-hub/common';
import { CreateOpponentTypeDto } from './dto/create-opponent-type.dto';

@Controller('charts')
@UseGuards(AuthGuard('jwt'))
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('opponent-types')
  async getPremiumContent(@CurrentUser() user: UserEntity) {
    const opponentTypes = await this.chartsService.getOpponentTypes(user.id);
    return { message: 'Fetched available opponent types', opponentTypes };
  }

  @Post('create-opponent-type')
  async createOpponentType(
    @CurrentUser() user: UserEntity,
    @Body() data: CreateOpponentTypeDto,
  ): Promise<{ message: string; opponentType: OpponentType }> {
    const opponentType = await this.chartsService.createOpponentType(
      user.id,
      data,
    );

    return {
      message: 'OpponentType created successfully',
      opponentType,
    };
  }
}
