import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function AuthSwagger<T extends new (...args: any[]) => {}>(constructor: T) {
    return ApiBearerAuth()(
        ApiUnauthorizedResponse({
            description: JSON.stringify({
                statusCode: 401,
                error: 'Unauthorized',
            }),
        })(constructor),
    );
}
