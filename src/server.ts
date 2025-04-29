import FastifySensible from '@fastify/sensible';
import dotenv from 'dotenv';
import { fastify } from 'fastify';
import CountryRepository from './repositories/country.repository';
import GeoRepository from './repositories/geo.repository';
import RegionRepository from './repositories/region.repository';
import GeoProcessorService from './services/geo-processor.service';

dotenv.config({ path: '../.env' });

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';

const buildServer = async () => {
    const server = fastify({ logger: true });
    // add plugins
    server.register(FastifySensible, { sharedSchemaId: 'HttpError' });

    // initialize dependencies
    const geoRepo = new GeoRepository();
    const regionRepo = new RegionRepository();
    const countryRepo = new CountryRepository();
    const geoProcessorService = new GeoProcessorService(
        geoRepo,
        regionRepo,
        countryRepo,
    );
    server.decorate('geoProcessorService', geoProcessorService);

    // basic routing
    server.get('/hello', async (req, reply) => {
        return 'Hello world!\n';
    });

    return server;
};

(async () => {
    const app = await buildServer();
    try {
        const address = app.listen({ port: PORT, host: HOST });
        app.log.info(`Server listening at ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
