export function buildSuccessResponse(data: any) {
    return {
        status: 'SUCCESS',
        result: data
    };
}

export function buildErrorResponse(error: string) {
    return {
        status: 'ERROR',
        error
    };
}
