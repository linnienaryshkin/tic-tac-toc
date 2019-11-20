import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    token: string;
}
