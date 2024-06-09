import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return await this.authService.createUsers(user);
  }
  @Post('signin')
  login(@Body() credentials: AuthDto) {
    const { email, password } = credentials;
    return this.authService.login(email, password);
  }
}
