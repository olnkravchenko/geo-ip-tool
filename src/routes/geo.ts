import { FastifyPluginAsync } from 'fastify';
import { GeoIPRelatedResponseDTO } from '../dtos/geoIp.dto';

const geoRoutes: FastifyPluginAsync = async (app) => {
    app.get('/ip/:ip', async (req, reply) => {
        const { ip } = req.params as { ip: string };
        const result = await app.geoProcessorService.ip2location([ip]);

        result[0].match(
            (data: { ip: string; location: GeoIPRelatedResponseDTO }) => {
                app.log.info(`200 OK ${ip}`);
                return reply.code(200).send(data);
            },
            (cause: string) => {
                app.log.error(cause);
                return reply.code(404).send({ message: 'Not found' });
            },
        );
    });
};

export default geoRoutes;
