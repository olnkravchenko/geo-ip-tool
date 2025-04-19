import { CountryDTO, CountryResponseDTO } from '../dtos/country.dto';
import { GeoIPDTO, GeoIPResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO, RegionResponseDTO } from '../dtos/region.dto';

export class GeoRepository {
    /**
     * addIP
     */
    public async addIP(ip: GeoIPDTO): Promise<GeoIPResponseDTO> {
        const rows = await prisma.geoIP.create({ data: ip });
        return rows;
    }

    /**
     * getRegions
     */
    public async getRegions(): Promise<RegionResponseDTO[]> {
        const rows = await prisma.region.findMany();
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
    public async getLocByIP(ip: string): Promise<GeoIPResponseDTO | null> {
        const row = await prisma.geoIP.findFirst({
            where: {
                startIp: { lte: BigInt(ip) },
                endIp: { gte: BigInt(ip) },
            },
        });
        return row;
    }
}
