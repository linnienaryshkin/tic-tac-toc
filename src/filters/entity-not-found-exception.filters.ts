import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilters implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        host.switchToHttp()
            .getResponse<Response>()
            .sendStatus(HttpStatus.NOT_FOUND);
    }
}
