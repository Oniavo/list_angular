import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    //post / signup
    @Post('/signup')
    async addUser(
      @Body('password') userPassword: string,
      @Body('mail') mail: string,
      @Body('username') username: string,
    ) {
      console.log(userPassword,mail);
      
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
      const result = await this.usersService.insertUser(
        username,
        mail,
        hashedPassword,
      );
      return {
        msg: 'User inserted'
      };
    }

    @UseGuards(AuthGuard)
    @Post('/note')
    async addNote(
      @Req() request,
      @Body('note') note: string,
    ) {
      const userMail = request.decodedData.email
      console.log(request.decodedData);
      
      await this.usersService.insertNote(note,userMail)
      return {
        msg: 'User inserted'
      };
    }

    @UseGuards(AuthGuard)
    @Get('/note')
    async getNote(
      @Req() request
    ) {
      const userMail = request.decodedData.email
      console.log(request.decodedData);
      
      const note = await this.usersService.getNote(userMail)
      return note;
    }
/* 
    @Post('/login')
    async loginUser(
      @Body('mail') mail: string,
      @Body('password') password: string,
    ) {
      
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this.usersService.getUser(
        username,
        mail,
        hashedPassword,
      );
      return {
        msg: 'User inserted'
      };
    } */

    @Get('/getuser/:email')
    async getUser(
      @Param('email') email: string
    ) {
      
      const result = await this.usersService.getUser(email);
      return result;
    }
}
