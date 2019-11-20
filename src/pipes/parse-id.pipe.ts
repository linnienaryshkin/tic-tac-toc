import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
    transform(id: string, metadata: ArgumentMetadata): number {
        const val = parseInt(id, 10);
        if (isNaN(val) || val < 0) {
            throw new BadRequestException('Validation failed');
        }
        return val;
    }
}
