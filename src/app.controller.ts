import { Controller, Get, Logger, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiImplicitBody, ApiImplicitFile, ApiResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from './decorators/user.decorator';
import { WithTime } from './interceptors/logging.interceptor';
import { AuthService } from './modules/auth/auth.service';
import { ConfigService } from './modules/config/config.service';

@Controller()
@ApiUseTags('general')
export class AppController {
    constructor(private readonly authService: AuthService, config: ConfigService) {
        if (config.isApiAuthEnabled) {
            Logger.debug(`Authorization is enabled`);
        }
    }

    @Get()
    root() {
        return 'hello';
    }
}
