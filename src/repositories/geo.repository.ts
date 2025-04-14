import { CountryDTO, CountryResponseDTO } from "../dtos/country.dto";
import { IPResponseDTO } from "../dtos/ip.dto";
import { RegionDTO, RegionResponseDTO } from "../dtos/region.dto";

export class GeoRepository {
  constructor(private creds: Credential) { }

  /**
   * addIp
   */
  public addIp(ip: string): IPResponseDTO {
    return { id: '123', address: '0.0.0.0' };
  }

  /**
   * getRegions
   */
  public getRegions(): RegionResponseDTO[] {
    return [{ id: '123', name: 'Donbass', short_name: 'DNB' }];
  }

  /**
   * getCountries
   */
  public getCountries(): CountryResponseDTO[] {
    return [{ id: '123', name: 'Ukraine', short_name: 'UA' }];
  }

  /**
   * getIpByRegion
   */
  public getIpByRegion(region: RegionDTO): IPResponseDTO[] | null {
    return [{ id: '123', address: '0.0.0.0' }];
  }

  /**
   * getIpByCountry
   */
  public getIpByCountry(country: CountryDTO): IPResponseDTO[] | null {
    return [{ id: '123', address: '0.0.0.0' }];
  }
}