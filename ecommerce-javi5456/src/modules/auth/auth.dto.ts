import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../users/users.dto';
import { PickType } from '@nestjs/swagger';
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
