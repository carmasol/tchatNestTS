import { Injectable } from '@nestjs/common';
import { authBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
        constructor(private readonly prisma: PrismaService) {}
    async login({ authBody }: { authBody: authBody}) {

        const { email, password} = authBody
        const existingUser = await this.prisma.user.findUnique({
            where:
            {
                email: authBody.email
            },
        });

        if(!existingUser) {
            throw new Error("l'utilisateur n'existe pas.");
        }

        const isPasswordSame = password === existingUser.password;

        if(!isPasswordSame) {
            throw new Error("Le mot de passe est invalide.");
        }
    
        return existingUser;
    }
}
