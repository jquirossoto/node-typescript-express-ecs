export function buildSuccessResponse(data: any) {
    return {
        status: 'SUCCESS',
        result: data
    };
}

export function buildErrorResponse(error: any) {
    return {
        status: 'ERROR',
        error
    };
}
