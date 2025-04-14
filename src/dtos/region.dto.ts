import { CountryResponseDTO } from './country.dto';

export type RegionDTO = {
    name?: string;
    short_name?: string;
};

export type RegionResponseDTO = {
    id: string;
    name: string;
    short_name: string;
    country: CountryResponseDTO;
};
