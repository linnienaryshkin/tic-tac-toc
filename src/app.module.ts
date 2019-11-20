import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { Game } from './modules/game/game.entity';
import { GameModule } from './modules/game/game.module';
import { GameService } from './modules/game/game.service';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'pass',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        }),
        AuthModule,
        ConfigModule,
        UserModule,
        GameModule,
        TypeOrmModule.forFeature([User, Game]),
    ],
    providers: [GameService],
})
export class AppModule {}
