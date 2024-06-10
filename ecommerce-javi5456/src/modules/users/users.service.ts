import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, ModifyUserDto } from './users.dto';

@Injectable()
export class Useservice {
  constructor(private readonly userRepository: UsersRepository) {}
  getUsers(page, limit) {
    return this.userRepository.getUsers(page, limit);
  }
  getUsersById(id: string) {
    return this.userRepository.getUsersById(id);
  }
  deleteUsers(id) {
    return this.userRepository.deleteUSersById(id);
  }
  modifyUSer(id, user: ModifyUserDto) {
    return this.userRepository.modifyUSer(id, user);
  }
}
