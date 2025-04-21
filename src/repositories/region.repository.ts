import { RegionIPResponseDTO, RegionResponseDTO } from '../dtos/region.dto';

export class RegionRepository {
    /**
     * getRegions
     */
    public async getRegions(): Promise<RegionResponseDTO[]> {
        const rows = await prisma.region.findMany();
        return rows;
    }

    /**
     * getRegion
     */
    public async getRegion(
        name?: string,
        code?: string,
    ): Promise<RegionResponseDTO[]> {
        const rows = await prisma.region.findMany({
            where: {
                OR: [
                    { name: { equals: name, mode: 'insensitive' } },
                    { code: { equals: code, mode: 'insensitive' } },
                ],
            },
        });
        return rows;
    }

    /**
     * getRegionIPs
     */
    public async getRegionIPs(
        regionID: string,
    ): Promise<RegionIPResponseDTO | null> {
        const rows = await prisma.region.findFirst({
            select: {
                id: true,
                name: true,
                code: true,
                countryId: true,
                geoIPs: true,
            },
            where: { id: { equals: regionID } },
        });
        return rows;
    }
}
