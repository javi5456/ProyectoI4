import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './Users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, ModifyUserDto } from './users.dto';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
  ) {}
  async getUsers(page, limit): Promise<User[]> {
    const users = await this.repositoryUser.find();
    let filteredUsers = users.map((user) =>
      this.removeNullableProperties(user),
    );
    const start = (page - 1) * limit;
    const end = start + limit;
    filteredUsers = filteredUsers.slice(start, end);
    return filteredUsers;
  }
  async getUsersById(id: string): Promise<User> {
    const user = await this.repositoryUser.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    delete user.password;

    const userFiltered = this.removeNullableProperties(user);
    return userFiltered;
  }
  async createUSers(user): Promise<User> {
    if (!user.role) {
      user.role = 'user';
    }
    const newUser = await this.repositoryUser.save(user);
    delete newUser.password;
    delete newUser.retryPassword;
    const filteredUsers = this.removeNullableProperties(newUser);
    return filteredUsers;
  }
  async deleteUSersById(id): Promise<void> {
    const result = await this.repositoryUser.delete(id);
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async modifyUSer(id: string, user): Promise<User> {
    delete user.retryPassword;
    const modifyUSer = await this.repositoryUser.findOne({ where: { id: id } });
    if (!modifyUSer) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.repositoryUser.update(id, user);
    const updateUser = await this.repositoryUser.findOne({ where: { id: id } });
    delete updateUser.password;
    const filteredUsers = await this.removeNullableProperties(updateUser);
    return filteredUsers;
  }
  async login(email: string): Promise<User | undefined> {
    const user = await this.repositoryUser.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userFiltered = await this.removeNullableProperties(user);
    return userFiltered;
  }
  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.repositoryUser.findOne({ where: { email } });
    return user;
  }

  private removeNullableProperties(user: User): User {
    return Object.fromEntries(
      Object.entries(user).filter(
        ([key, value]) => value !== null && value !== undefined,
      ),
    ) as User;
  }
}
