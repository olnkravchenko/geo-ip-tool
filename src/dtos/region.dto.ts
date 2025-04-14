import { CountryResponseDTO } from './country.dto';

export type RegionDTO = {
    name?: string;
    code?: string;
};

export type RegionResponseDTO = {
    id: string;
    name: string;
    code: string;
    country: CountryResponseDTO;
};
