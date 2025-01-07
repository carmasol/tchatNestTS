import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
