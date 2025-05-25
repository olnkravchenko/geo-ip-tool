import { RegionLevel } from '@prisma/client';
import { GeoIPRecordDTO } from './geoIp.dto';

export type RegionDTO = {
    name?: string;
    isoCode?: string;
};

export type RegionRecordDTO = {
    id: string;
    name: string;
    isoCode: string | null;
    regionLevel: RegionLevel;
    countryId: string;
    parentRegionId: string | null;
};

export type RegionIPRecordDTO = {
    id: string;
    name: string;
    isoCode: string | null;
    regionLevel: RegionLevel;
    countryId: string;
    parentRegionId: string | null;
    geoIPs: GeoIPRecordDTO[];
};
