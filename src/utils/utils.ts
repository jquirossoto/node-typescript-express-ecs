/**
 * @file API utils.
 * @author jquirossoto
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Builds a success response.
 *
 * @param  {any} data
 */
export const buildSuccessResponse = (data: object | [] | null) => {
    return {
        status: 'SUCCESS',
        result: data
    };
};

/**
 * Builds an error response.
 *
 * @param  {string[]} errors
 */
export const buildErrorResponse = (errors: string[]) => {
    return {
        status: 'ERROR',
        errors
    };
};

export const resolveDirname =async (url: string) => {
    return dirname(fileURLToPath(url));
};
