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
    geoIPs: {
        id: string;
        startIp: bigint;
        endIp: bigint;
        countryId: string;
        regionId: string | null;
        latitude: number;
        longitude: number;
        accuracyRadius: number;
    }[];
};

enum RegionLevel {
    HIGHEST,
    LOWEST,
    CITY,
}
