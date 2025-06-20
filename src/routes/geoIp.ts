import { FastifyPluginAsync } from 'fastify';
import { GeoIPFailureDTO, GeoIPSuccessDTO } from '../dtos/geoIp.dto';
import { processBulkResults } from '../utils/results-processing';

const geoIPRoutes: FastifyPluginAsync = async (app) => {
    app.get('/:ip', async (req, reply) => {
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

    app.post('/bulk', async (req, reply) => {
        const { ips } = req.body as { ips: string[] };
        const result = await app.geoProcessorService.ip2location(ips);

        const [statusCode, response] = processBulkResults<
            GeoIPSuccessDTO,
            GeoIPFailureDTO
        >(result, req.log);

        return reply.code(statusCode).send(response);
    });
};

export default geoIPRoutes;
