import prisma from '../db/db-client';
import {
    GeoIPDTO,
    GeoIPRecordDTO,
    GeoIPRelatedRecordDTO,
} from '../dtos/geoIp.dto';

export default class GeoRepository {
    constructor(private readonly db = prisma) {}
    /**
     * addIP
     */
    public async addIP(ip: GeoIPDTO): Promise<GeoIPRecordDTO> {
        const row = await this.db.geoIP.create({ data: ip });
        return row;
    }

    /**
     * getIPByCoords
     */
    public async getIPByCoords(
        latitude: string,
        longitude: string,
    ): Promise<GeoIPRecordDTO[]> {
        // find the most popular accuracy radius from the database
        const accRadius = await this.db.geoIP.groupBy({
            by: ['accuracyRadius'],
            _count: {
                accuracyRadius: true,
            },
            orderBy: {
                _count: {
                    accuracyRadius: 'desc',
                },
            },
            take: 1,
        });
        const rad = accRadius[0]?._count?.accuracyRadius || 20;

        const rows = await this.db.geoIP.findMany({
            where: {
                latitude: {
                    gte: parseFloat(latitude) - rad,
                    lte: parseFloat(latitude) + rad,
                },
                longitude: {
                    gte: parseFloat(longitude) - rad,
                    lte: parseFloat(longitude) + rad,
                },
            },
        });

        return rows;
    }

    /**
     * getLocByIP
     */
    public async getLocByIP(ip: string): Promise<GeoIPRelatedRecordDTO | null> {
        const row = await this.db.geoIP.findFirst({
            select: {
                id: true,
                startIp: true,
                endIp: true,
                country: true,
                region: true,
                latitude: true,
                longitude: true,
                accuracyRadius: true,
            },
            where: {
                startIp: { lte: BigInt(ip) },
                endIp: { gte: BigInt(ip) },
            },
        });
        return row;
    }
}
