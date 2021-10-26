export function buildSuccessResponse(data: any) {
    return {
        status: 'SUCCESS',
        result: data
    };
}

export function buildErrorResponse(errors: string[]) {
    return {
        status: 'ERROR',
        errors
    };
}
