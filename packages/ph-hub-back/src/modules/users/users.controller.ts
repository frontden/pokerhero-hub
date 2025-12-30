import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireAccessLevel } from '../auth/decorators/access-level.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UserEntity } from '../database/entities/user.entity';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { User, UserPreferences } from '@ph-hub/common';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: UserEntity): Promise<User> {
    return this.usersService.getUser(user.id);
  }

  @Post('complete-onboarding')
  async completeOnboarding(
    @CurrentUser() user: UserEntity,
    @Body() data: CreateUserPreferencesDto,
  ): Promise<{ message: string; user: User }> {
    const updatedUser = await this.usersService.completeOnboarding(
      user.id,
      data,
    );

    return {
      message: 'Onboarding completed successfully',
      user: updatedUser,
    };
  }

  @Patch('preferences')
  async updatePreferences(
    @CurrentUser() user: UserEntity,
    @Body() data: Partial<CreateUserPreferencesDto>,
  ): Promise<{ message: string; preferences: UserPreferences }> {
    const preferences = await this.usersService.updatePreferences(
      user.id,
      data,
    );

    return {
      message: 'Preferences updated successfully',
      preferences,
    };
  }

  @Get('trial-content')
  @UseGuards(RolesGuard)
  @RequireAccessLevel(1)
  async getPremiumContent(@CurrentUser() user: UserEntity) {
    return { message: 'Premium content', user };
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
}
