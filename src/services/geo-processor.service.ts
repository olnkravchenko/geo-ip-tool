import { err, ok, Result } from 'neverthrow';
import { CountryDTO } from '../dtos/country.dto';
import { GeoIPResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO } from '../dtos/region.dto';
import { GeoRepository } from '../repositories/geo.repository';
import { RegionRepository } from '../repositories/region.repository';

export class GeoProcessorService {
    constructor(
        private geoRep: GeoRepository,
        private regionRep: RegionRepository,
    ) {}
    /**
     * ip2location
     */
    public async ip2location(
        ips: string[],
    ): Promise<Result<{ ip: string; location: GeoIPResponseDTO }, string>[]> {
        const locs = await Promise.all(
            ips.map(async (ip) => {
                const loc = await this.geoRep.getLocByIP(ip);

                if (loc == null) {
                    return err(`Location for ${ip} not found`);
                }
                return ok({ ip: ip, location: loc });
            }),
        );
        return locs;
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
