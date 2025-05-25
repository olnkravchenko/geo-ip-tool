import prisma from '../db/db-client';
import { RegionIPRecordDTO, RegionRecordDTO } from '../dtos/region.dto';

export default class RegionRepository {
    constructor(private readonly db = prisma) {}
    /**
     * getRegions
     */
    public async getRegions(): Promise<RegionRecordDTO[]> {
        const rows = await this.db.region.findMany();
        return rows;
    }

    /**
     * getRegion
     */
    public async getRegion(
        name?: string,
        isoCode?: string,
    ): Promise<RegionRecordDTO[]> {
        const rows = await this.db.region.findMany({
            where: {
                OR: [
                    { name: { equals: name, mode: 'insensitive' } },
                    { isoCode: { equals: isoCode, mode: 'insensitive' } },
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
    ): Promise<RegionIPRecordDTO | null> {
        const row = await this.db.region.findFirst({
            select: {
                id: true,
                name: true,
                isoCode: true,
                regionLevel: true,
                countryId: true,
                parentRegionId: true,
                geoIPs: true,
            },
            where: { id: { equals: regionID } },
        });
        return row;
    }
}
