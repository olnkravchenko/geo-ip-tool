import { err, ok, Result } from 'neverthrow';
import { CountryDTO, CountryIPRecordDTO } from '../dtos/country.dto';
import { GeoIPFailureDTO, GeoIPRelatedSuccessDTO } from '../dtos/geoIp.dto';
import { RegionDTO, RegionIPRecordDTO } from '../dtos/region.dto';
import CountryRepository from '../repositories/country.repository';
import GeoRepository from '../repositories/geo.repository';
import RegionRepository from '../repositories/region.repository';

export default class GeoProcessorService {
    constructor(
        private readonly geoRepo: GeoRepository,
        private readonly regionRepo: RegionRepository,
        private readonly countryRepo: CountryRepository,
    ) {}
    /**
     * ip2location
     */
    public async ip2location(
        ips: string[],
    ): Promise<Result<GeoIPRelatedSuccessDTO, GeoIPFailureDTO>[]> {
        const locs = await Promise.all(
            ips.map(async (ip) => {
                const loc = await this.geoRepo.getLocByIP(ip);

                if (loc == null) {
                    return err({
                        ip: ip,
                        message: 'Not found',
                    });
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
        isoCode,
    }: RegionDTO): Promise<Result<RegionIPRecordDTO, string>[]> {
        // check whether region exists
        const regions = await this.regionRepo.getRegion(name, isoCode);

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
    public async getIpByCountry({
        name,
        isoCode,
    }: CountryDTO): Promise<Result<CountryIPRecordDTO, string>[]> {
        // check whether country exists
        const countries = await this.countryRepo.getCountry(name, isoCode);

        if (countries.length == 0) {
            return [err('Country not found')];
        }
        // filter IPs by country
        const ipRanges = await Promise.all(
            countries.map(async (c) => {
                const ips = await this.countryRepo.getCountryIPs(c.id);

                if (ips == null) {
                    return err(`IPs for ${c.name} not found`);
                }
                return ok(ips);
            }),
        );
        return ipRanges;
    }

    // TODO: implement
    /**
     * getIpByCoords
     */
    public async getIpByCoords(latitude: string, longitude: string) {}
}
