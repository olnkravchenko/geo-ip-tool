import { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (app) => {
    app.get('/health', async (_, reply) => {
        return reply.code(200).send('Hello world!\n');
    });
};

export default healthRoutes;
