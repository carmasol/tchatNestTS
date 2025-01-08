import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { request } from 'http';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

export type AuthBody = { email: string; password: string };
export type CreateUser = { email: string; firstName: string, password: string }

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}


    //localhost:3000/auth/login
    // 1. Envoie un mot de passe et un email
    // 2. l'API te renvoie un token sécurisé "totododo"
    @Post('login')
    async login(@Body() authBody: AuthBody) {
        //console.log({ authBody });
        return await this.authService.login({ 
            authBody,
        });

    }



    @Post('register')
    async register(@Body() registerBody: CreateUser) {
        //console.log({ authBody });
        return await this.authService.register({ 
            registerBody,
        });

    }


    // 3. Tu renvoies ton token sécurisé "totododo"
    // localhost:3000/auth/
    
    // On veut utiliser JwtStrategy.
    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Request() request: RequestWithUser) {
        // totododo => toto@gmail.com
        return await this.userService.getUser( {
            userId: request.user.userId,
        });
    } 

}    

