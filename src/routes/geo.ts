import { FastifyPluginAsync } from 'fastify';
import { GeoIPFailureDTO, GeoIPRelatedSuccessDTO } from '../dtos/geoIp.dto';

const geoRoutes: FastifyPluginAsync = async (app) => {
    app.get('/ip/:ip', async (req, reply) => {
        const { ip } = req.params as { ip: string };
        const result = await app.geoProcessorService.ip2location([ip]);

        result[0].match(
            (data) => {
                req.log.info(`200 OK ${ip}`);
                return reply.code(200).send(data);
            },
            (cause) => {
                req.log.info(cause);
                return reply.code(404).send(cause.message);
            },
        );
    });

    app.post('/ip/bulk', async (req, reply) => {
        const { ips } = req.body as { ips: string[] };
        const result = await app.geoProcessorService.ip2location(ips);

        const data = result.map((r) =>
            r.match(
                (data) => {
                    req.log.info(`200 OK ${data.ip}`);
                    return data;
                },
                (cause) => {
                    req.log.error(cause.message);
                    return cause;
                },
            ),
        );

        return reply.code(200).send(data);
    });
};

export default geoRoutes;
