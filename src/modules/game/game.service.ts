import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { DEFAULT_MAP } from './constants/default-map.constant';
import { GetListDto } from './dto/get-list.dto';
import { Game } from './game.entity';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}

    async list(query: GetListDto): Promise<Game[]> {
        return this.gameRepository.find({
            where: query.status ? { status: query.status } : {},
            relations: ['ticUser', 'tacUser'],
        });
    }

    async create(user: User): Promise<Game> {
        if (user.currentGame) {
            throw new BadRequestException();
        }

        const game = new Game();

        game.map = DEFAULT_MAP;

        game.ticUser = null;
        game.tacUser = null;
        if (Math.random() >= 0.5) {
            game.ticUser = user;
        } else {
            game.tacUser = user;
        }

        await this.gameRepository.save(game);

        // user.currentGameId = game.id;
        // await this.userRepository.save(user);

        return game;
    }

    async get(id): Promise<Game> {
        return this.gameRepository.findOneOrFail(id, {
            relations: ['ticUser', 'tacUser'],
        });
    }

    async leave(user: User): Promise<Game> {
        if (!user.currentGame) {
            throw new BadRequestException();
        }

        if (user.currentGame.ticUser.id !== user.id && user.currentGame.tacUser.id !== user.id) {
            throw new BadRequestException();
        }

        const isTicUser = user.currentGame.ticUser.id === user.id;

        if (isTicUser) {
            user.currentGame.ticUser = null;
        } else {
            user.currentGame.tacUser = null;
        }

        user.currentGame = null;

        await this.userRepository.save(user);
        return this.gameRepository.save(user.currentGame);
    }

    async join(user: User, id: number): Promise<Game> {
        if (user.currentGame) {
            throw new BadRequestException();
        }

        const game = await this.gameRepository.findOneOrFail(id, {
            relations: ['ticUser', 'tacUser'],
        });

        if (game.ticUser) {
            game.tacUser = user;
        } else if (game.tacUser) {
            game.ticUser = user;
        } else {
            throw new BadRequestException();
        }

        user.currentGame = game;

        await this.userRepository.save(user);
        return this.gameRepository.save(game);
    }

    async move(user: User, map: number[]): Promise<Game> {
        if (!user.currentGame) {
            throw new BadRequestException();
        }

        user.currentGame.map = map;

        return this.gameRepository.save(user.currentGame);
    }
}
