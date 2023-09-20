import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Status } from '../enum/status.enum';

export class CreateAlunoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sobrenome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  idade: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  altura: number;

  @ApiProperty({ enum: Status, enumName: 'Status' })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
