/**
 * @file Server.
 * @author jquirossoto
 */

import app from './app.js';
import prisma from './utils/client.prisma.js';
import logger from './utils/logger.js';

const port = process.env.PORT || 3000;
const signals = [
    'SIGINT',
    'SIGTERM'
];

const server = app.listen(port, () => {
    logger.info(`Running on port ${port}`);
});

const shutdown = (signal: string) => {
    server.close(async () => {
        await prisma.$disconnect();
        logger.info(`Stopped by ${signal}`);
    });
};

signals.forEach((signal) => {
    process.on(signal, () => {
        shutdown(signal);
    });
});

export default server;