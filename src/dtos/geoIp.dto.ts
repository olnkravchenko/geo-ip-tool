import { Decimal } from '@prisma/client/runtime/library';
import { CountryRecordDTO } from './country.dto';
import { RegionRecordDTO } from './region.dto';

export type GeoIPDTO = {
    startIp: bigint;
    endIp: bigint;
    countryId: string;
    regionId?: string;
    latitude: number;
    longitude: number;
    accuracyRadius?: number;
};

export type GeoIPRecordDTO = {
    id: string;
    startIp: bigint;
    endIp: bigint;
    countryId: string;
    regionId: string | null;
    latitude: Decimal;
    longitude: Decimal;
    accuracyRadius: number;
};

export type GeoIPRelatedRecordDTO = {
    id: string;
    startIp: bigint;
    endIp: bigint;
    country: CountryRecordDTO;
    region: RegionRecordDTO | null;
    latitude: Decimal;
    longitude: Decimal;
    accuracyRadius: number;
};

export type GeoIPRelatedSuccessDTO = {
    ip: string;
    location: GeoIPRelatedRecordDTO;
};

export type GeoIPFailureDTO = {
    ip: string;
    message: string;
};
