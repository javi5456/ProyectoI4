import { Module } from '@nestjs/common';
import { Usercontroller } from './users.controller';
import { Useservice } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './Users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [Usercontroller],
  providers: [Useservice, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
