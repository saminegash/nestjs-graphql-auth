import { User } from './../users/entities/user.entity';
import { LoginUserInput } from './dto/login-userinput';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = user ? await bcrypt.compare(password, user.password) : false;

    if (user && valid) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    if (user) {
      return {
        access_token: this.jwtService.sign({
          username: user.username,
          sub: user.id,
        }),
        user,
      };
    }
  }

  async signup(signUpUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(signUpUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(signUpUserInput.password, 10);

    return this.usersService.create({
      ...signUpUserInput,
      password,
    });
  }
}
