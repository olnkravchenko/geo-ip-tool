import { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (app) => {
    app.get('/health', async (req, reply) => {
        return 'Hello world!\n';
    });
};

export default healthRoutes;
