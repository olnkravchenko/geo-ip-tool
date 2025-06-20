import { FastifyBaseLogger } from 'fastify';

type GroupedResults<S, F> = {
    oks: S[];
    errors: F[];
};

export const processBulkResults = <S, F>(
    rawData: any[],
    logger: FastifyBaseLogger,
): [number, GroupedResults<S, F>] => {
    const groupedData = rawData.reduce<GroupedResults<S, F>>(
        (acc, res) => {
            res.match(
                (data: any) => acc.oks.push(data),
                (cause: any) => acc.errors.push(cause),
            );
            return acc;
        },
        { oks: [], errors: [] },
    );
    logger.info(groupedData.oks);
    logger.error(groupedData.errors);

    // SEARCH: investigate edge cases and responses for them
    if (groupedData.oks.length === 0) {
        return [
            404,
            {
                oks: [],
                errors: groupedData.errors,
            },
        ];
    }

    return [200, groupedData];
};
