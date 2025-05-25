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
    country: {
        id: string;
        name: string;
        isoCode: string;
        continentCode: string;
        continentName: string;
    };
    region: {
        id: string;
        countryId: string;
        name: string;
        code: string | null;
    } | null;
    latitude: number;
    longitude: number;
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
