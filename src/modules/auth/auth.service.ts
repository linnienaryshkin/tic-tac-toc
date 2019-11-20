import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async registration(data: LoginDto): Promise<TokenDto> {
        if (
            await this.userRepository.findOne({
                where: {
                    name: data.name,
                    password: data.password,
                },
            })
        ) {
            throw new BadRequestException();
        }

        const user = new User();

        user.name = data.name;
        user.password = data.password;

        await this.userRepository.save(user);

        return {
            token: this.jwtService.sign({ id: user.id }),
        };
    }

    async login(data: LoginDto): Promise<TokenDto> {
        const user = await this.userRepository.findOne({
            where: {
                name: data.name,
                password: data.password,
            },
        });

        if (!user) {
            throw new NotFoundException();
        }

        return {
            token: this.jwtService.sign({ id: user.id }),
        };
    }
}
