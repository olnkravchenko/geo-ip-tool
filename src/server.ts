import FastifySensible from '@fastify/sensible';
import dotenv from 'dotenv';
import { fastify } from 'fastify';

dotenv.config({ path: '../.env' });

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';

export const server = fastify();
server.register(FastifySensible, { sharedSchemaId: 'HttpError' });

server.get('/hello', async (req, reply) => {
    return 'Hello world!\n';
});

server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
