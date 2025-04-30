export type CountryDTO = {
    name?: string;
    isoCode?: string;
};

export type CountryRecordDTO = {
    id: string;
    name: string;
    isoCode: string;
};

export type CountryIPRecordDTO = {
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
