import { parse } from 'csv-parse';
import fs from 'fs/promises';
import path from 'path';
// import prisma from '../src/db/db-client';

const readRecords = async (filePath: string): Promise<Array<string[]>> => {
    const raw = await fs.readFile(filePath, 'utf-8');

    const records: Array<string[]> = [];
    const parser = parse(raw, { columns: true, skip_empty_lines: true });

    await new Promise<void>((resolve, reject) => {
        parser
            .on('readable', () => {
                let record: string[] | null;
                while ((record = parser.read())) {
                    records.push(record);
                }
            })
            .on('error', reject)
            .on('end', resolve);
    });

    return records;
};

const main = async () => {
    const dataPath = path.resolve(__dirname, '../build/data');
    const countriesFile = path.resolve(dataPath, 'countries.csv');
    const geoipsFile = path.resolve(dataPath, 'geoips.csv');

    const countriesData = await readRecords(countriesFile);
    const geoipsData = await readRecords(geoipsFile);

    // const parsedCountries = countriesData.map();

    console.log(countriesData);
    console.log(countriesData.length);
};

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
