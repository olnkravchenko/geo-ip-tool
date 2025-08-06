import { RegionLevel } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { err, ok } from 'neverthrow';
import { CountryIPRecordDTO, CountryRecordDTO } from '../../src/dtos/country.dto';
import { GeoIPRecordDTO, GeoIPRelatedRecordDTO } from '../../src/dtos/geoIp.dto';
import { RegionIPRecordDTO, RegionRecordDTO } from '../../src/dtos/region.dto';
import CountryRepository from '../../src/repositories/country.repository';
import GeoRepository from '../../src/repositories/geo.repository';
import RegionRepository from '../../src/repositories/region.repository';
import GeoProcessorService from '../../src/services/geo-processor.service';

jest.mock('../../src/repositories/geo.repository');
jest.mock('../../src/repositories/region.repository');
jest.mock('../../src/repositories/country.repository');

describe('GeoProcessorService', () => {
    let geoProcessorService: GeoProcessorService;
    let mockGeoRepo: jest.Mocked<GeoRepository>;
    let mockRegionRepo: jest.Mocked<RegionRepository>;
    let mockCountryRepo: jest.Mocked<CountryRepository>;

    // data for testing
    const mockCountry: CountryRecordDTO = {
        id: '1',
        name: 'United Kingdom',
        isoCode: 'GB',
        continentCode: 'EU',
        continentName: 'Europe',
    }
    const mockRegion: RegionRecordDTO = {
        id: '1',
        name: 'London',
        isoCode: 'LDN',
        regionLevel: RegionLevel.CITY,
        countryId: 'GB',
        parentRegionId: null
    }
    const mockGeoIPDetailed: GeoIPRelatedRecordDTO = {
        id: '1',
        startIp: BigInt('3232235777'), // 192.168.1.1 in decimal
        endIp: BigInt('3232235778'), // 192.168.1.2 in decimal
        country: mockCountry,
        region: mockRegion,
        latitude: new Decimal(51.5074),
        longitude: new Decimal(-0.1278),
        accuracyRadius: 100
    }
    const mockGeoIP: GeoIPRecordDTO = {
        id: '1',
        startIp: BigInt('3232235777'), // 192.168.1.1 in decimal
        endIp: BigInt('3232235778'), // 192.168.1.2 in decimal
        countryId: '1',
        regionId: '1',
        latitude: new Decimal(51.5074),
        longitude: new Decimal(-0.1278),
        accuracyRadius: 100
    }
    const mockRegionIPs: RegionIPRecordDTO = {
        ...mockRegion,
        geoIPs: [mockGeoIP]
    };
    const mockCountryIPs: CountryIPRecordDTO = {
        ...mockCountry,
        geoIPs: [mockGeoIP]
    };


    beforeEach(() => {
        jest.clearAllMocks();
        mockGeoRepo = new GeoRepository() as jest.Mocked<GeoRepository>;
        mockRegionRepo = new RegionRepository() as jest.Mocked<RegionRepository>;
        mockCountryRepo = new CountryRepository() as jest.Mocked<CountryRepository>;

        geoProcessorService = new GeoProcessorService(
            mockGeoRepo,
            mockRegionRepo,
            mockCountryRepo
        );
    });

    describe('ip2location', () => {
        const validIP = '192.168.1.1';
        const invalidIP = '0.0.0.0';

        it('should return location for valid IP', async () => {
            const expectedResult = ok({ ip: validIP, location: mockGeoIPDetailed })
            mockGeoRepo.getLocByIP.mockResolvedValueOnce(mockGeoIPDetailed);

            const result = await geoProcessorService.ip2location([validIP]);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(expectedResult);
        });

        it('should return error for invalid IP', async () => {
            const expectedError = { ip: invalidIP, message: 'Not found' };
            mockGeoRepo.getLocByIP.mockResolvedValueOnce(null);

            const result = await geoProcessorService.ip2location([invalidIP]);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(expectedError);
        });

        it('should handle multiple IPs', async () => {
            mockGeoRepo.getLocByIP
                .mockResolvedValueOnce(mockGeoIPDetailed)
                .mockResolvedValueOnce(null);

            const result = await geoProcessorService.ip2location([validIP, invalidIP]);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(ok({ ip: validIP, location: mockGeoIPDetailed }));
            expect(result[1]).toEqual(err({ ip: invalidIP, message: 'Not found' }));
        });
    });

    describe('getIpByRegion', () => {
        const validRegion = { name: 'London', isoCode: 'LDN' };

        it('should return IPs for valid region', async () => {
            mockRegionRepo.getRegion.mockResolvedValueOnce([mockRegion]);
            mockRegionRepo.getRegionIPs.mockResolvedValueOnce(mockRegionIPs);

            const result = await geoProcessorService.getIpByRegion(validRegion);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(ok(mockRegionIPs));
        });

        it('should return error for non-existent region', async () => {
            mockRegionRepo.getRegion.mockResolvedValueOnce([]);

            const result = await geoProcessorService.getIpByRegion(validRegion);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(err('Region not found'));
        });
    });

    describe('getIpByCountry', () => {
        const validCountry = { name: 'United Kingdom', isoCode: 'GB' };

        it('should return IPs for valid country', async () => {
            mockCountryRepo.getCountry.mockResolvedValueOnce([mockCountry]);
            mockCountryRepo.getCountryIPs.mockResolvedValueOnce(mockCountryIPs);

            const result = await geoProcessorService.getIpByCountry(validCountry);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(ok(mockCountryIPs));
        });

        it('should return error for non-existent country', async () => {
            mockCountryRepo.getCountry.mockResolvedValueOnce([]);

            const result = await geoProcessorService.getIpByCountry(validCountry);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(err('Country not found'));
        });
    });

    describe('getIpByCoords', () => {
        const validLatitude = '51.5074';
        const validLongitude = '-0.1278';

        it('should return IPs for valid coordinates', async () => {
            mockGeoRepo.getIPByCoords.mockResolvedValueOnce([mockGeoIP]);

            const result = await geoProcessorService.getIpByCoords(
                validLatitude,
                validLongitude
            );

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(ok(mockGeoIP));
        });

        it('should return error for coordinates with no IPs', async () => {
            mockGeoRepo.getIPByCoords.mockResolvedValueOnce([]);

            const result = await geoProcessorService.getIpByCoords(
                validLatitude,
                validLongitude
            );

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(
                err('IPs not found for the given coordinates')
            );
        });
    });
});