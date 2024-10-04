// src/auth/auth.service.ts
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemaUser';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }

  async validateToken(token: string){
    return this.jwtService.verify(token,{secret:'Oniavo'})
  }

  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.userService.getUser(mail);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
        email: user.email,
        password: user.password
      };
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
