export const buildSuccessResponse = (data: any) => {
    return {
        status: 'SUCCESS',
        result: data
    };
}

export const buildErrorResponse = (errors: string[]) => {
    return {
        status: 'ERROR',
        errors
    };
}
