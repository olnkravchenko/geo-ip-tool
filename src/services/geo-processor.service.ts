import { err, ok, Result } from 'neverthrow';
import { CountryDTO } from '../dtos/country.dto';
import { GeoIPResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO } from '../dtos/region.dto';
import { GeoRepository } from '../repositories/geo.repository';

export class GeoProcessorService {
    constructor(private geoRep: GeoRepository) {}
    /**
     * ip2location
     */
    public ip2location(ips: string[]) {
        // parse ip into location
    }

    /**
     * getIpByRegion
     */
    public async getIpByRegion({
        name,
        code,
    }: RegionDTO): Promise<Result<GeoIPResponseDTO[], string>> {
        // check whether region exists
        const regions = await this.geoRep.getRegions();

        const filteredRegions = regions.filter(
            (r) => r.name === (name ?? null) || r.code === (code ?? null),
        );
        if (filteredRegions.length == 0) {
            return err('Region not found');
        }
        // filter IPs by region
        return ok([
            {
                id: '1',
                startIp: 123n,
                endIp: 456n,
                countryId: '345',
                regionId: null,
            },
        ]);
    }

    /**
     * getIpByCountry
     */
    public getIpByCountry(country: CountryDTO) {
        // check whether country exists
        // filter IPs by country
    }
}
