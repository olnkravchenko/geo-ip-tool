export type GeoIPDTO = {
    startIp: bigint;
    endIp: bigint;
    countryId: string;
    regionId?: string;
};

export type GeoIPResponseDTO = {
    id: string;
    startIp: bigint;
    endIp: bigint;
    countryId: string;
    regionId: string | null;
};

export type GeoIPRelatedResponseDTO = {
    id: string;
    startIp: bigint;
    endIp: bigint;
    country: {
        id: string;
        name: string;
        isoCode: string;
    };
    region: {
        id: string;
        countryId: string;
        name: string;
        code: string | null;
    } | null;
};
