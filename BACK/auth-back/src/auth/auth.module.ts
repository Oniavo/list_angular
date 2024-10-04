// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';

// @Module({
//   providers: [AuthService],
//   controllers: [AuthController]
// })
// export class AuthModule {}



import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserSchema } from 'src/user/schemaUser';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'Oniavo',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  providers: [AuthService,UserService],
  controllers: [AuthController],
  exports: [AuthService]
  
})

export class AuthModule {}

