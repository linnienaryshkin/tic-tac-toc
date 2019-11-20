import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListDto {
    @IsOptional()
    @IsNumber()
    @ApiModelProperty({ example: '123', required: false })
    status: number;
}
