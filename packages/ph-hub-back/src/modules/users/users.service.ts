import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { UserPreferencesEntity } from '../database/entities/user-preferences.entity';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { User, UserPreferences } from '@ph-hub/common';
import { mapToUser, mapToUserPreferences } from './functions/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UserPreferencesEntity)
    private preferencesRepository: Repository<UserPreferencesEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['preferences'],
      order: { id: 'ASC' },
    });

    return users.map((user) => mapToUser(user));
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['preferences'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['preferences'],
    });
  }

  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return mapToUser(user);
  }

  async completeOnboarding(
    userId: number,
    data: CreateUserPreferencesDto,
  ): Promise<User> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.nickname = data.nickname;
    user.avatar = data.avatar;
    user.onboardingCompleted = true;

    await this.userRepository.save(user);

    let preferences = await this.preferencesRepository.findOne({
      where: { userId: user.id },
    });

    if (!preferences) {
      preferences = this.preferencesRepository.create({
        userId: user.id,
        gameType: data.gameType,
        spinType: data.spinType,
        limits: data.limits,
        pokerRooms: data.pokerRooms,
      });
    } else {
      preferences.gameType = data.gameType;
      preferences.spinType = data.spinType;
      preferences.limits = data.limits;
      preferences.pokerRooms = data.pokerRooms;
    }

    await this.preferencesRepository.save(preferences);

    const updatedUser = await this.findOne(user.id);
    return mapToUser(updatedUser);
  }

  async updatePreferences(
    userId: number,
    data: Partial<CreateUserPreferencesDto>,
  ): Promise<UserPreferences> {
    let preferences = await this.preferencesRepository.findOne({
      where: { userId },
    });

    if (!preferences) {
      preferences = this.preferencesRepository.create({
        userId,
        ...data,
      });
    } else {
      Object.assign(preferences, data);
    }

    const saved = await this.preferencesRepository.save(preferences);
    return mapToUserPreferences(saved);
  }
}
