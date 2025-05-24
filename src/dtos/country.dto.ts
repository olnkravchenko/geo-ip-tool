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
