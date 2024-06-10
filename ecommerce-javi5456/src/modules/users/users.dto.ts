import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../auth/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Javier',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'Javier@example.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @ApiProperty({
    description:
      'Contraseña segura del usuario min caracteres 8 con 1 mayuscula 1 numero y 1 caracter (!@#$%^&*) obligatorio',
    example: 'Example123!',
  })
  password: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @ApiProperty({
    description:
      'Se pide reingreso de contraseña segura del usuario min caracteres 8 con 1 mayuscula 1 numero y 1 caracter (!@#$%^&*) obligatorio',
    example: 'Example123!',
  })
  retryPassword: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    description: 'Rol del usuario por defecto es user',
    example: 'user',
  })
  role: Role;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Telefono del usuario',
    example: '1234567890',
  })
  phone: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Direccion del usuario',
    example: 'Calle 123',
  })
  address: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'Pais del usuario',
    example: 'Colombia',
  })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'Ciudad del usuario',
    example: 'Bogotá',
  })
  city: string;
}

export class ModifyUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Javier',
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'Javier@example.com',
  })
  email: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @ApiProperty({
    description:
      'Contraseña segura del usuario min caracteres 8 con 1 mayuscula 1 numero y 1 caracter (!@#$%^&*) obligatorio',
    example: 'Example123!',
  })
  password: string;
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  @ApiProperty({
    description:
      'Se pide reingreso de contraseña segura del usuario min caracteres 8 con 1 mayuscula 1 numero y 1 caracter (!@#$%^&*) obligatorio',
    example: 'Example123!',
  })
  retryPassword: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    description: 'Rol del usuario por defecto es user',
    example: 'user',
  })
  role: Role;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Telefono del usuario',
    example: '1234567890',
  })
  phone: number;

  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Direccion del usuario',
    example: 'Calle 123',
  })
  address: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'Pais del usuario',
    example: 'Colombia',
  })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'Ciudad del usuario',
    example: 'Bogotá',
  })
  city: string;
}
