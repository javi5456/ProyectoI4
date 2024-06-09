import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../users/users.dto';
import { PickType } from '@nestjs/swagger';
export class AuthDto extends PickType(CreateUserDto, ['email', 'password']) {}
