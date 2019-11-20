import { Body, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CustomController } from '../../decorators/custon-controller.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@CustomController('auth', 'Registration / Authorization')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    @ApiCreatedResponse({ type: TokenDto })
    async registration(@Body() data: LoginDto): Promise<TokenDto> {
        return this.authService.registration(data);
    }

    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: TokenDto })
    async login(@Body() data: LoginDto): Promise<TokenDto> {
        return this.authService.login(data);
    }
}
