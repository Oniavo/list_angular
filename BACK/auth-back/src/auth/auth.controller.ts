// src/auth/auth.controller.ts
import { UnauthorizedException } from '@nestjs/common';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(
    @Body('mail') mail: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(mail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
  
}
