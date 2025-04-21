import { err, ok, Result } from 'neverthrow';
import { CountryDTO } from '../dtos/country.dto';
import { GeoIPRelatedResponseDTO } from '../dtos/geoIp.dto';
import { RegionDTO, RegionIPResponseDTO } from '../dtos/region.dto';
import { CountryRepository } from '../repositories/country.repository';
import { GeoRepository } from '../repositories/geo.repository';
import { RegionRepository } from '../repositories/region.repository';

export class GeoProcessorService {
    constructor(
        private geoRepo: GeoRepository,
        private regionRepo: RegionRepository,
private countryRepo: CountryRepository,
    ) {}
    /**
     * ip2location
     */
    public async ip2location(
        ips: string[],
    ): Promise<
        Result<{ ip: string; location: GeoIPRelatedResponseDTO }, string>[]
    > {
        const locs = await Promise.all(
            ips.map(async (ip) => {
                const loc = await this.geoRepo.getLocByIP(ip);

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
    }: RegionDTO): Promise<Result<RegionIPResponseDTO, string>[]> {
        // check whether region exists
        const regions = await this.regionRepo.getRegion(name, code);

        if (regions.length == 0) {
            return [err('Region not found')];
        }
        // filter IPs by region
        const ipRanges = await Promise.all(
            regions.map(async (r) => {
                const ips = await this.regionRepo.getRegionIPs(r.id);

                if (ips == null) {
                    return err(`IPs for ${r.name} not found`);
                }

                return ok(ips);
            }),
        );
        return ipRanges;
    }

    /**
     * getIpByCountry
     */
    public getIpByCountry(country: CountryDTO) {
        // check whether country exists
        // filter IPs by country
    }
}
