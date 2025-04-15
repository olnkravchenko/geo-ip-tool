import { CountryDTO, CountryResponseDTO } from '../dtos/country.dto';
import { GeoIpDTO, GeoIPResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO, RegionResponseDTO } from '../dtos/region.dto';

export class GeoRepository {
    /**
     * addIp
     */
    public async addIp(ip: GeoIpDTO): Promise<GeoIPResponseDTO> {
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
     * getIpByRegion
     */
    // public getIpByRegion(region: RegionDTO): GeoIPResponseDTO[] | null {
    //     return [{ id: '123', startIp: '0.0.0.0' }];
    // }

    /**
     * getIpByCountry
     */
    // public getIpByCountry(country: CountryDTO): GeoIPResponseDTO[] | null {
    //     return [{ id: '123', address: '0.0.0.0' }];
    // }
}
