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
