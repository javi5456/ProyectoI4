import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Useservice } from './users.service';
import { CreateUserDto } from './users.dto';
import { AuthGuard } from 'src/guards/authGuard.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '../auth/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './Users.entity';

@ApiTags('users')
@Controller('users')
export class Usercontroller {
  constructor(private readonly userService: Useservice) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getUsersById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUsersById(id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUSers(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUsers(id);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  modifyUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ): Promise<User> {
    return this.userService.modifyUSer(id, user);
  }
}
