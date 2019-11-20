import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column('int', { nullable: true, array: true })
    @ApiModelProperty({
        type: Number,
        isArray: true,
    })
    map: number[];

    @OneToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn()
    @ApiModelProperty({
        type: User,
    })
    ticUser: User;

    @OneToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn()
    @ApiModelProperty({
        type: User,
    })
    tacUser: User;

    @Column({ nullable: true })
    @ApiModelProperty()
    status: number;
}
