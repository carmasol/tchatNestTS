import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export type authBody = { email: string; password: string};
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    //localhost:3000/auth/login
    // 1. Envoie un mot de passe et un email
    // 2. l'API te renvoie un token sécurisé "totododo"
    @Post('login')
    async login(@Body() authBody: { email: string; password: string }) {
        //console.log({ authBody });
        return await this.authService.login({ 
            authBody,
        });


    }
    // 3. Tu renvoies ton token sécurisé "totododo"
    // localhost:3000/auth/
    @Get()
    async authenticate() {
        await fetch('auth', {
            body: {
                email: 'toto@gmail.com',
            },
            headers: {
                "Content-Type": "application/js",
                Authorization: "Bearer totododo",
            }
        })
        // totododo => toto@gmail.com
        return;
    }

}    

