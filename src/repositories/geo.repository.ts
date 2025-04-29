import prisma from '../db/db-client';
import {
    GeoIPDTO,
    GeoIPRelatedResponseDTO,
    GeoIPResponseDTO,
} from '../dtos/geoIp.dto';

export default class GeoRepository {
    constructor(private readonly db = prisma) {}
    /**
     * addIP
     */
    public async addIP(ip: GeoIPDTO): Promise<GeoIPResponseDTO> {
        const rows = await this.db.geoIP.create({ data: ip });
        return rows;
    }

    /**
     * getIPByCoords
     */
    public async getIPByCoords(latitude: string, longtitude: string) {}

    /**
     * getLocByIP
     */
    public async getLocByIP(
        ip: string,
    ): Promise<GeoIPRelatedResponseDTO | null> {
        const row = await this.db.geoIP.findFirst({
            select: {
                id: true,
                startIp: true,
                endIp: true,
                country: true,
                region: true,
            },
            where: {
                startIp: { lte: BigInt(ip) },
                endIp: { gte: BigInt(ip) },
            },
        });
        return row;
    }
}
