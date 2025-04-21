export type RegionDTO = {
    name?: string;
    code?: string;
};

export type RegionResponseDTO = {
    id: string;
    name: string;
    code: string | null;
    countryId: string;
};

export type RegionIPResponseDTO = {
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
