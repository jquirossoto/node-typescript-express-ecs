import app from './app'
import prisma from './utils/client.prisma';

const port = process.env.PORT || 3000;
const signals = {
    'SIGINT': 2,
    'SIGTERM': 15
};

const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const shutdown = (signal: string, value: number) => {
    server.close(async () => {
        await prisma.$disconnect();
        console.log('Stopped by ' + signal);
        process.exit(0);
    });
};

Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        // @ts-ignore
        shutdown(signal, signals[signal]);
    });
});

export default server;