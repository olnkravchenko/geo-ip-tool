export type GeoIpDTO = {
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
