import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';



@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global:true,
      signOptions: { expiresIn: '30d'},
    })
  ],
  controllers: [AuthController],
  providers: [PrismaService, JwtService, AuthService, JwtStrategy,UserService, ]
})
export class AuthModule {}
