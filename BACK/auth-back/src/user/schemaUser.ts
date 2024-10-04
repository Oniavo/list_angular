import { Schema, Document } from 'mongoose';

export const NoteSchema = new Schema({
  content: {type: String, required: true },
  date: { type: Date, required: true },
})

export const UserSchema = new Schema({
  username: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  note: [NoteSchema]
});



export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  note: Note[]
}

export interface Note extends Document {
  content: string;
  date: Date;
}