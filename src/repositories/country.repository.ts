import { CountryIPResponseDTO, CountryResponseDTO } from '../dtos/country.dto';

export class CountryRepository {
    /**
     * getCountries
     */
    public async getCountries(): Promise<CountryResponseDTO[]> {
        const rows = await prisma.country.findMany();
        return rows;
    }

    /**
     * getCountry
     */
    public async getCountry(
        name?: string,
        isoCode?: string,
    ): Promise<CountryResponseDTO[]> {
        const rows = await prisma.country.findMany({
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
    ): Promise<CountryIPResponseDTO | null> {
        const rows = await prisma.country.findFirst({
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
