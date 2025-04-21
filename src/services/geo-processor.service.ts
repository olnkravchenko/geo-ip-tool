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
    }: RegionDTO): Promise<Result<RegionIPResponseDTO, string>[]> {
        // check whether region exists
        const regions = await this.regionRep.getRegion(name, code);

        if (regions.length == 0) {
            return [err('Region not found')];
        }
        // filter IPs by region
        const ipRanges = await Promise.all(
            regions.map(async (r) => {
                const reg = await this.regionRep.getRegionIPs(r.id);

                if (reg == null) {
                    return err(`IPs for ${r.name} not found`);
                }

                return ok(reg);
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
