import { Injectable } from '@nestjs/common';
import { authBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import  { compare, hash }  from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
        constructor(private readonly prisma: PrismaService,
            private readonly jwtService: JwtService,) {}
    async login({ authBody }: { authBody: authBody}) {

        const { email, password} = authBody

        //console.log({ hashPassword, password });
        const existingUser = await this.prisma.user.findUnique({
            where:
            {
                email: authBody.email
            },
        });

        if(!existingUser) {
            throw new Error("l'utilisateur n'existe pas.");
        }

        const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword: existingUser.password
        })

        if(!isPasswordValid) {
            throw new Error("Le mot de passe est invalide.");
        }
    
        return this.authenticateUser({
            userId: existingUser.id
        });
        //const hashedPassword = await this.hashPassword({ password });
    }

    private async hashPassword({ password }: { password: string }) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async isPasswordValid({ 
        password,
        hashedPassword 
    }: { 
        password: string,
        hashedPassword: string,
    }) {
        const isPasswordValid = await await compare(password, hashedPassword);
        return isPasswordValid;
    }

    private async authenticateUser({ userId }: { userId: number}){
        const payload = { userId };
        return {
            acces_token: this.jwtService.sign(payload),
        };
    }
    
}
