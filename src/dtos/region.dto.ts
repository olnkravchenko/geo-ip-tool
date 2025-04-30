export type RegionDTO = {
    name?: string;
    code?: string;
};

export type RegionRecordDTO = {
    id: string;
    name: string;
    code: string | null;
    countryId: string;
};

export type RegionIPRecordDTO = {
    id: string;
    name: string;
    code: string | null;
    countryId: string;
    geoIPs: {
        id: string;
        startIp: bigint;
        endIp: bigint;
        countryId: string;
        regionId: string | null;
    }[];
};
