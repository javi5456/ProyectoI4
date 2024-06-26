import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';
import { CreateUserDto } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUsers(user: CreateUserDto): Promise<CreateUserDto> {
    if (user.password != user.retryPassword)
      throw new Error('password mismatch');
    const userDb = await this.userRepository.getByEmail(user.email);
    if (userDb) {
      throw new HttpException('Email was registered', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new HttpException(
        'Error hashing password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const resultUser = await this.userRepository.createUSers({
      ...user,
      password: hashedPassword,
    });

    return Object.fromEntries(
      Object.entries(resultUser).filter(
        ([key, value]) => value !== null && value !== undefined,
      ),
    ) as CreateUserDto;
  }
  async login(email, password) {
    const userByemail = await this.userRepository.login(email);
    console.log(userByemail);
    if (!userByemail) {
      throw new HttpException(
        'user or password incorrect',
        HttpStatus.CONFLICT,
      );
    }
    const validPassword = await bcrypt.compare(password, userByemail.password);
    if (!validPassword) {
      throw new HttpException(
        'user or password incorrect',
        HttpStatus.CONFLICT,
      );
    }
    const userPayload = {
      sub: userByemail.id,
      id: userByemail.id,
      email: userByemail.email,
      role: userByemail.role,
    };
    const token = this.jwtService.sign(userPayload);
    return { succes: 'user logered', token };
  }
}
