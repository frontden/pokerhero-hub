import { IsString, IsOptional } from 'class-validator';
import { CreateOpponentTypeRequest } from '@ph-hub/common';

export class CreateOpponentTypeDto implements CreateOpponentTypeRequest {
  @IsString()
  title: string;

  @IsString()
  color: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  isDefault: boolean;
}
