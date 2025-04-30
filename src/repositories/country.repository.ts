import prisma from '../db/db-client';
import { CountryIPRecordDTO, CountryRecordDTO } from '../dtos/country.dto';

export default class CountryRepository {
    constructor(private readonly db = prisma) {}
    /**
     * getCountries
     */
    public async getCountries(): Promise<CountryRecordDTO[]> {
        const rows = await this.db.country.findMany();
        return rows;
    }

    /**
     * getCountry
     */
    public async getCountry(
        name?: string,
        isoCode?: string,
    ): Promise<CountryRecordDTO[]> {
        const rows = await this.db.country.findMany({
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
     * getCountryIPs
     */
    public async getCountryIPs(
        countryID: string,
    ): Promise<CountryIPRecordDTO | null> {
        const rows = await this.db.country.findFirst({
            select: {
                id: true,
                name: true,
                isoCode: true,
                geoIPs: true,
            },
            where: { id: { equals: countryID } },
        });
        return rows;
    }
}
