/**
 * @file Server.
 * @author jquirossoto
 */

import app from './app'
import prisma from './utils/client.prisma';

const port = process.env.PORT || 3000;
const signals = [
    'SIGINT',
    'SIGTERM'
];

const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const shutdown = (signal: string) => {
    server.close(async () => {
        await prisma.$disconnect();
        console.log(`Stopped by ${signal}`);
    });
};

signals.forEach((signal) => {
    process.on(signal, () => {
        shutdown(signal);
    });
});

export default server;