import { FastifyPluginAsync } from 'fastify';
import { GeoIPFailureDTO, GeoIPRelatedSuccessDTO } from '../dtos/geoIp.dto';

type GroupedResults = {
    oks: GeoIPRelatedSuccessDTO[];
    errors: GeoIPFailureDTO[];
};

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

        const groupedData = result.reduce<GroupedResults>(
            (acc, res) => {
                res.match(
                    (data) => acc.oks.push(data),
                    (cause) => acc.errors.push(cause),
                );
                return acc;
            },
            { oks: [], errors: [] },
        );
        req.log.info(groupedData.oks);
        req.log.error(groupedData.errors);

        return reply.code(200).send(groupedData);
    });
};

export default geoRoutes;
