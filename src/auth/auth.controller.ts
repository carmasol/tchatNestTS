import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export type authBody = { email: string; password: string};
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() authBody: { email: string; password: string }) {
        console.log({ authBody });
        return '';


    }
}    

