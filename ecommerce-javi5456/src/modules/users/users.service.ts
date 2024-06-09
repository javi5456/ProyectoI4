import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './Users.entity';

@Injectable()
export class Useservice {
  constructor(private readonly userRepository: UsersRepository) {}
  getUsers() {
    return this.userRepository.getUsers();
  }
  getUsersById(id: string) {
    return this.userRepository.getUsersById(id);
  }
  deleteUsers(id) {
    return this.userRepository.deleteUSersById(id);
  }
  modifyUSer(id, user) {
    return this.userRepository.modifyUSer(id, user);
  }
}
