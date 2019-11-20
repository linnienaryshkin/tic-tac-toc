import { Body, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitParam, ApiOkResponse } from '@nestjs/swagger';
import { AuthSwagger } from '../../decorators/auth-swagger.decorator';
import { CustomController } from '../../decorators/custon-controller.decorator';
import { User } from '../../decorators/user.decorator';
import { ParseIdPipe } from '../../pipes/parse-id.pipe';
import { GameMapDto } from './dto/game-map.dto';
import { GetListDto } from './dto/get-list.dto';
import { Game } from './game.entity';
import { GameService } from './game.service';

@CustomController('games', 'Games')
@UseGuards(AuthGuard('jwt'))
@AuthSwagger
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    @ApiOkResponse({ type: Game, isArray: true })
    async list(@Query() query: GetListDto): Promise<Game[]> {
        return this.gameService.list(query);
    }

    @Post()
    @ApiOkResponse({ type: Game })
    async create(@User() user) {
        return this.gameService.create(user);
    }

    @Get(':id')
    @ApiOkResponse({ type: Game })
    @ApiImplicitParam({ name: 'id', description: 'Game id' })
    async get(@Param('id', ParseIdPipe) id: number): Promise<Game> {
        return this.gameService.get(id);
    }

    @Post('leave')
    @ApiOkResponse({ type: Game })
    async leave(@User() user) {
        return this.gameService.leave(user);
    }

    @Post(':id/join')
    @ApiOkResponse({ type: Game })
    @ApiImplicitParam({ name: 'id', description: 'Game id' })
    async join(@Param('id', ParseIdPipe) id: number, @User() user) {
        return this.gameService.join(user, id);
    }

    @Post('move')
    @ApiOkResponse({ type: Game })
    async move(@User() user, @Body() data: GameMapDto) {
        return this.gameService.move(user, data.map);
    }
}
