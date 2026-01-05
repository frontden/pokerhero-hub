import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';
import { CreateUserPreferencesRequest } from '@ph-hub/common';

export class CreateUserPreferencesDto implements CreateUserPreferencesRequest {
  @IsString()
  nickname: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  avatar: string[];

  @IsString()
  gameType: string;

  @IsOptional()
  @IsString()
  spinType?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  limits: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  pokerRooms: string[];
}
