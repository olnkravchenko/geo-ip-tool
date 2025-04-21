import { CountryResponseDTO } from '../dtos/country.dto';
import {
    GeoIPDTO,
    GeoIPRelatedResponseDTO,
    GeoIPResponseDTO,
} from '../dtos/geoIp.dto';

export class GeoRepository {
    /**
     * addIP
     */
    public async addIP(ip: GeoIPDTO): Promise<GeoIPResponseDTO> {
        const rows = await prisma.geoIP.create({ data: ip });
        return rows;
    }

    /**
     * getCountries
     */
    public async getCountries(): Promise<CountryResponseDTO[]> {
        const rows = await prisma.country.findMany();
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
        const row = await prisma.geoIP.findFirst({
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
