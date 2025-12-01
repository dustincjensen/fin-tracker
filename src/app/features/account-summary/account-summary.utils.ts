import { createDate, getPreviousMonth, isInYearMonth, monthsSince, today } from '../../utils/date.utils';

/**
 * Determines if an update is needed based on the latest date.
 *
 * @param latestDate The date to check.
 */
export function isUpdateNeededForAccount(latestDate: string | undefined): boolean {
    if (!latestDate) {
        return false;
    }

    const todayStr = today();
    const latestDateCreated = createDate(latestDate);
    return (
        !isInYearMonth(createDate(todayStr), latestDateCreated) &&
        !isInYearMonth(createDate(getPreviousMonth(todayStr)), latestDateCreated) &&
        monthsSince(latestDate) < 6
    );
}
