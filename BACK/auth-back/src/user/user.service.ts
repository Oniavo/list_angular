import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, User } from './schemaUser';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUser(eMail: string) {
    const email = eMail.toLowerCase();
    const user = await this.userModel.findOne({"email":email});
    return user;
  }

  async insertUser(username:string,email_data: string, password: string) {
    const email = email_data.toLowerCase();
    const newUser = new this.userModel({
      username,
      email,
      password,
    });
    await newUser.save();
    return newUser;
  }

  async insertNote(note:string,email_data: string) {
    const email = email_data.toLowerCase();
    const user = await this.userModel.findOne({'email':email}).exec();
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    user.note.push({
      content: note,
      date: new Date()
    } as Note)
    const updatedUser = await user.save()
    return updatedUser;
  }


  async getNote(email_data: string) {
    const email = email_data.toLowerCase();
    const user = await this.userModel.findOne({'email':email}).exec();
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    return user.note;
  }

  

  // Ajouter des méthodes pour créer des utilisateurs, etc.
}
