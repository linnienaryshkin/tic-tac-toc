import { ApiModelProperty } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../game/game.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column({ length: 500, nullable: true })
    @ApiModelProperty()
    name: string;

    @Column({ length: 255, nullable: true })
    password: string;

    @OneToOne(() => Game, { onDelete: 'SET NULL' })
    @JoinColumn()
    @ApiModelProperty({
        type: Game,
    })
    currentGame: Game;
    @Column({ nullable: true })
    currentGameId: number;
}
