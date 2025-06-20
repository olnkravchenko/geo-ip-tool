import { GeoIPRecordDTO } from './geoIp.dto';

export type CountryDTO = {
    name?: string;
    isoCode?: string;
};

export type CountryRecordDTO = {
    id: string;
    name: string;
    isoCode: string;
    continentCode: string;
    continentName: string;
};

export type CountryIPRecordDTO = {
    id: string;
    name: string;
    isoCode: string;
    continentCode: string;
    continentName: string;
    geoIPs: GeoIPRecordDTO[];
};

export type CountrySuccessDTO = {
    country: CountryRecordDTO | CountryIPRecordDTO;
};

export type CountryFailureDTO = {
    country: CountryDTO | null;
    message: string;
};
