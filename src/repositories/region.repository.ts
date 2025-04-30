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
        code?: string,
    ): Promise<RegionRecordDTO[]> {
        const rows = await this.db.region.findMany({
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
    ): Promise<RegionIPRecordDTO | null> {
        const row = await this.db.region.findFirst({
            select: {
                id: true,
                name: true,
                code: true,
                countryId: true,
                geoIPs: true,
            },
            where: { id: { equals: regionID } },
        });
        return row;
    }
}
