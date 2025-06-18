import { FastifyPluginAsync } from 'fastify';

const locationRoutes: FastifyPluginAsync = async (app) => {
    app.get('/coords', async (req, reply) => {
        const { lat, lon } = req.query as { lat: string; lon: string };
        if (!lat || !lon) {
            return reply.code(400).send({ error: 'Missing lat or lon' });
        }
        const result = await app.geoProcessorService.getIpByCoords(lat, lon);
        return reply.code(200).send(result);
    });

    app.get('/region', async (req, reply) => {
        const { name, isoCode } = req.query as {
            name?: string;
            isoCode?: string;
        };
        const result = await app.geoProcessorService.getIpByRegion({
            name,
            isoCode,
        });
        return reply.code(200).send(result);
    });

    app.get('/country', async (req, reply) => {
        const { name, isoCode } = req.query as {
            name?: string;
            isoCode?: string;
        };
        const result = await app.geoProcessorService.getIpByCountry({
            name,
            isoCode,
        });
        return reply.code(200).send(result);
    });
};

export default locationRoutes;
