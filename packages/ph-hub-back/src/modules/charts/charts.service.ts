import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { OpponentTypeEntityEntity } from '../database/entities/opponent-type.entity';
import { OpponentType } from '@ph-hub/common';
import { CreateOpponentTypeDto } from './dto/create-opponent-type.dto';
import { mapToOpponentType } from './functions/opponent-type.mapper';

@Injectable()
export class ChartsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OpponentTypeEntityEntity)
    private opponentTypeRepository: Repository<OpponentTypeEntityEntity>,
  ) {}

  async getOpponentTypes(userId: number): Promise<OpponentType[]> {
    return this.opponentTypeRepository.find({
      where: [{ isDefault: true }, { user: { id: userId } }],
    });
  }

  async createOpponentType(
    userId: number,
    data: CreateOpponentTypeDto,
  ): Promise<OpponentType> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const opponentType = await this.opponentTypeRepository.save({
      ...data,
      user,
    });

    return mapToOpponentType(opponentType);
  }
}
