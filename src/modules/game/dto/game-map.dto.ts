import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GameMapDto {
    @IsNotEmpty()
    @IsArray()
    @IsNumber(null, {
        each: true,
    })
    @ApiModelProperty({
        example: [0, 1, 0, 0, 0, 0, 0, 2, 0],
    })
    map: number[];
}
