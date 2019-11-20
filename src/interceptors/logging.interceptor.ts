import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        Logger.log('Before...', 'LoggingInterceptor');

        const now = Date.now();
        return next.handle().pipe(
            tap(() => Logger.log(`After... ${Date.now() - now}ms`, 'LoggingInterceptor')),
            map(data => ({ data, time: Date.now() - now })),
        );
    }
}

export const WithTime = UseInterceptors(LoggingInterceptor);
