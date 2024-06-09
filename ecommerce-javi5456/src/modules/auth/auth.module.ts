import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { User } from '../users/Users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [authController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
