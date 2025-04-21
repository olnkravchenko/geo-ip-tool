export type CountryDTO = {
    name?: string;
    isoCode?: string;
};

export type CountryResponseDTO = {
    id: string;
    name: string;
    isoCode: string;
};

export type CountryIPResponseDTO = {
    id: string;
    name: string;
    isoCode: string | null;
    geoIPs: {
        id: string;
        startIp: bigint;
        endIp: bigint;
        countryId: string;
        regionId: string | null;
    }[];
};
