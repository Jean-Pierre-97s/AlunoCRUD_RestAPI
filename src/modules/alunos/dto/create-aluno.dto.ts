import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

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
}
