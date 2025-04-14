import { CountryDTO } from "../dtos/country.dto";
import { RegionDTO, RegionResponseDTO } from "../dtos/region.dto";
import { GeoRepository } from "../repositories/geo.repository";



export class GeoProcessorService {
  constructor(private geo_rep: GeoRepository) { }
  /**
   * ip2location
   */
  public ip2location(ips: string[]): RegionResponseDTO[] {
    // parse ip into location
  }

  /**
   * getIpByRegion
   */
  public getIpByRegion(region: RegionDTO) {
    // check whether region exists
    // filter IPs by region
  }

  /**
   * getIpByCountry
   */
  public getIpByCountry(country: CountryDTO) {
    // check whether country exists
    // filter IPs by country  
  }
}