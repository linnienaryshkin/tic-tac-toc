import { Controller, HttpStatus, SerializeOptions } from '@nestjs/common';
import { ApiBadRequestResponse, ApiUseTags } from '@nestjs/swagger';

export function CustomController(prefix: string, tag: string = 'General') {
    return <T extends new (...args: any[]) => {}>(constructor: T) => {
        return Controller(prefix)(
            ApiUseTags(tag)(
                ApiBadRequestResponse({
                    description: JSON.stringify({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Validation failed',
                        errors: { property: 'error' },
                    }),
                })(constructor),
            ),
        );
    };
}
