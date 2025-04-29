import 'fastify';
import GeoProcessorService from '../services/geo-processor.service';

declare module 'fastify' {
    interface FastifyInstance {
        geoProcessorService: GeoProcessorService;
    }
}
