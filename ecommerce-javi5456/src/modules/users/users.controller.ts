import {
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Useservice } from './users.service';
import { ModifyUserDto } from './users.dto';
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
  getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<User[]> {
    if (page && limit) {
      return this.userService.getUsers(page, limit);
    }
    return this.userService.getUsers(page, limit);
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
    @Body() user: ModifyUserDto,
  ): Promise<User> {
    return this.userService.modifyUSer(id, user);
  }
}
