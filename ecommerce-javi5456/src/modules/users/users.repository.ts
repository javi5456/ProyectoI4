import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './Users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
  ) {}
  async getUsers() {
    const users = await this.repositoryUser.find();
    return users;
  }
  async getUsersById(id: string): Promise<User> {
    const user = await this.repositoryUser.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    delete user.password;
    return user;
  }
  async createUSers(user): Promise<User> {
    if (!user.role) {
      user.role = 'user';
    }
    const newUser = await this.repositoryUser.save(user);
    delete newUser.password;
    delete newUser.retryPassword;
    return newUser;
  }
  async deleteUSersById(id): Promise<void> {
    const result = await this.repositoryUser.delete(id);
    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }
  async modifyUSer(id, user): Promise<User> {
    await this.repositoryUser.update(id, user);
    const updateUser = await this.repositoryUser.findOne(id);
    if (!updateUser) {
      throw new Error('User not found');
    }
    return updateUser;
  }
  async login(email: string): Promise<User | undefined> {
    const user = await this.repositoryUser.findOne({ where: { email } });
    return user;
  }
  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.repositoryUser.findOne({ where: { email } });

    return user;
  }
}
