import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  originalName?: string;

  filename?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  alunoId: string;
}
