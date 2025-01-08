import { Injectable } from '@nestjs/common';
import { AuthBody, CreateUser } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import  { compare, hash }  from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
        constructor(private readonly prisma: PrismaService,
            private readonly jwtService: JwtService,) {}
    async login({ authBody }: { authBody: AuthBody}) {

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

    private async authenticateUser({ userId }: UserPayload) {
        const payload: UserPayload = { userId };
        return {
            acces_token: this.jwtService.sign(payload),
        };
    }



    async register({ registerBody }: { registerBody: CreateUser }) {
        const { email, firstName, password } = registerBody;

        //console.log({ hashPassword, password });
        const existingUser = await this.prisma.user.findUnique({
            where:
            {
                email,
            },
        });

        if(existingUser) {
            throw new Error("Un compte existe déja à cette email");
        }

        const hashedPassword = await this.hashPassword({ password });

        const createdUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
            }
        });
    


        return this.authenticateUser({
            userId: createdUser.id,
        });
    }

    
    


}
