import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  file_path: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  alunoId: string;
}
