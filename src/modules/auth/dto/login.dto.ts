import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: '123' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'password' })
    password: string;
}
