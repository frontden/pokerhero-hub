import { Injectable } from '@nestjs/common';
import { UserInterface } from '@ph-hub/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './modules/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserInterface[]> {
    const users = await this.userRepository.find({
      order: { id: 'ASC' },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessLevel: user.accessLevel,
    }));
  }
}
