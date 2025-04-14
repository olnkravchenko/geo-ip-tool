import { CountryDTO, CountryResponseDTO } from '../dtos/country.dto';
import { GeoIPResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO, RegionResponseDTO } from '../dtos/region.dto';

export class GeoRepository {
    constructor(private creds: Credential) {}

    /**
     * addIp
     */
    public addIp(ip: string): GeoIPResponseDTO {
        return { id: '123', address: '0.0.0.0' };
    }

    /**
     * getRegions
     */
    public getRegions(): RegionResponseDTO[] {
        return [
            {
                id: '123',
                name: 'Donbass',
                code: 'DNB',
                country: { id: '123', name: 'Ukraine', isoCode: 'UA' },
            },
        ];
    }

    /**
     * getCountries
     */
    public getCountries(): CountryResponseDTO[] {
        return [{ id: '123', name: 'Ukraine', isoCode: 'UA' }];
    }

    /**
     * getIpByRegion
     */
    public getIpByRegion(region: RegionDTO): GeoIPResponseDTO[] | null {
        return [{ id: '123', address: '0.0.0.0' }];
    }

    /**
     * getIpByCountry
     */
    public getIpByCountry(country: CountryDTO): GeoIPResponseDTO[] | null {
        return [{ id: '123', address: '0.0.0.0' }];
    }
}
