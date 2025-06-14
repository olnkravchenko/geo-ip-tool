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
    public async getIPByCoords(latitude: string, longitude: string) {}

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
