import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireAccessLevel } from '../auth/decorators/access-level.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UserEntity } from '../database/entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: UserEntity) {
    return user;
  }

  // Only for Trial (accessLevel >= 1)
  @Get('trial-content')
  @UseGuards(RolesGuard)
  @RequireAccessLevel(1)
  async getPremiumContent(@CurrentUser() user: UserEntity) {
    return { message: 'Premium content', user };
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
