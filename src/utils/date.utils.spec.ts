import moment from 'moment';
import {
  allMonthsBetweenDates,
  allYearsBetweenDates,
  createDate,
  formatDate,
  formatDateFull,
  formatDateMonthYear,
  getMonthDateForOer,
  getYearDateForOer,
  getEarliestDate,
  getLatestDate,
  getMonthAndYearFromDate,
  getPreviousMonth,
  getYearFromDate,
  isInYear,
  isInYearMonth,
  monthNamesLong,
  monthNamesShort,
  monthValues,
  stringToDayMonthYear,
  stringToMonthYear,
  getDateForOer,
} from './date.utils';

describe('utils', () => {
  describe('date', () => {
    describe('monthValues', () => {
      it('should return the correct month and value', () => {
        const expected: Array<{ value: string; month: string }> = [
          { value: '0', month: 'January' },
          { value: '1', month: 'February' },
          { value: '2', month: 'March' },
          { value: '3', month: 'April' },
          { value: '4', month: 'May' },
          { value: '5', month: 'June' },
          { value: '6', month: 'July' },
          { value: '7', month: 'August' },
          { value: '8', month: 'September' },
          { value: '9', month: 'October' },
          { value: '10', month: 'November' },
          { value: '11', month: 'December' },
        ];
        expect(monthValues).toEqual(expected);
      });
    });

    describe('monthNamesLong', () => {
      it('should return all 12 long month names', () => {
        const expected = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        expect(monthNamesLong()).toEqual(expected);
      });
    });

    describe('monthNamesShort', () => {
      it('should return all 12 short month names', () => {
        const expected = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        expect(monthNamesShort()).toEqual(expected);
      });
    });

    describe('isInYearMonth', () => {
      const assertIsInYearMonth = (date: string, targetYearMonth: string, expected: boolean) => {
        expect(isInYearMonth(createDate(date), createDate(targetYearMonth))).toBe(expected);
      };

      it('should return true when 2020-10-31 and 2020-10-01', () =>
        assertIsInYearMonth('2020-10-31', '2020-10-01', true));
      it('should return true when 2020-02-29 and 2020-02-01', () =>
        assertIsInYearMonth('2020-02-29', '2020-02-01', true));
      it('should return false when 2020-02-29 and 2020-03-01', () =>
        assertIsInYearMonth('2020-02-29', '2020-03-01', false));
    });

    describe('isInYear', () => {
      const assertIsInYear = (date: string, targetYear: string, expected: boolean) => {
        expect(isInYear(createDate(date), createDate(targetYear))).toBe(expected);
      };

      it('should return true when 2020-10-31 and 2020-01-01', () => assertIsInYear('2020-10-31', '2020-01-01', true));
      it('should return true when 2020-12-31 and 2020-01-01', () => assertIsInYear('2020-12-31', '2020-01-01', true));
      it('should return false when 2019-12-31 and 2020-01-01', () => assertIsInYear('2019-12-31', '2020-01-01', false));
    });

    describe('formatDate', () => {
      const assertFormatDate = (date: string, expected: string) => {
        expect(formatDate(date)).toBe(expected);
      };

      // TODO moment deprecation warning
      it('should format "2020-06-16" as "Jun 16"', () => assertFormatDate('2020-06-16', 'Jun 16'));
      it('should format "2020-05-04" as "May 4"', () => assertFormatDate('2020-05-04', 'May 4'));
    });

    // TODO Test with moment objects as well
    describe('formatDateFull', () => {
      const assertFormatDateFull = (date: string, expected: string) => {
        expect(formatDateFull(date)).toBe(expected);
      };

      // TODO moment deprecation warning
      it('should format "2020-06-16" as "June 16, 2020"', () => assertFormatDateFull('2020-06-16', 'June 16, 2020'));
      it('should format "2020-05-04" as "May 4, 2020"', () => assertFormatDateFull('2020-05-04', 'May 4, 2020'));
    });

    describe('formatDateMonthYear', () => {
      const assertFormatDateMonthYear = (date: string, expected: string) => {
        expect(formatDateMonthYear(date)).toBe(expected);
      };

      // TODO moment deprecation warning
      it('should format "2020-06-16" as "Jun 2020"', () => assertFormatDateMonthYear('2020-06-16', 'Jun 2020'));
      it('should format "2020-05-04" as "May 2020"', () => assertFormatDateMonthYear('2020-05-04', 'May 2020'));
    });

    describe('getPreviousMonth', () => {
      const assertGetPreviousMonth = (date: string, expected: string) => {
        // getPreviousMonth returns with the time component, but we only
        // want to test the date portion of the return.
        expect(getPreviousMonth(date).replace(/T.*/, '')).toBe(expected);
      };

      it('should start with 2019-12-31 when passed 2020-01-31', () =>
        assertGetPreviousMonth('2020-01-31', '2019-12-31'));
      it('should start with 2020-02-29 when passed 2020-03-31', () =>
        assertGetPreviousMonth('2020-03-31', '2020-02-29'));
      it('should start with 2019-02-28 when passed 2019-03-31', () =>
        assertGetPreviousMonth('2019-03-31', '2019-02-28'));
      it('should start with 2020-01-29 when passed 2020-02-29', () =>
        assertGetPreviousMonth('2020-02-29', '2020-01-29'));
      it('should start with 2019-01-28 when passed 2019-02-28', () =>
        assertGetPreviousMonth('2019-02-28', '2019-01-28'));
    });

    describe('getMonthAndYearFromDate', () => {
      const assertGetMonthAndYearFromDate = (date: string, expected: number[]) => {
        expect(getMonthAndYearFromDate(date)).toEqual(expected);
      };

      it('should return 0,2020 when provided 2020-01-15', () => assertGetMonthAndYearFromDate('2020-01-15', [0, 2020]));
      it('should return 1,2020 when provided 2020-02-29', () => assertGetMonthAndYearFromDate('2020-02-29', [1, 2020]));
      it('should return 1,2019 when provided 2019-02-28', () => assertGetMonthAndYearFromDate('2019-02-28', [1, 2019]));
      it('should return 11,2020 when provided 2020-12-01', () =>
        assertGetMonthAndYearFromDate('2020-12-01', [11, 2020]));
    });

    describe('getYearFromDate', () => {
      const assertGetYearFromDate = (date: string, expected: number) => {
        expect(getYearFromDate(date)).toBe(expected);
      };

      it('should return 2020 when provided 2020-02-29', () => assertGetYearFromDate('2020-02-29', 2020));
      it('should return 2020 when provided 2020-01-01', () => assertGetYearFromDate('2020-01-01', 2020));
      it('should return 2020 when provided 2020-12-31', () => assertGetYearFromDate('2020-12-31', 2020));
      it('should return 2019 when provided 2019-12-31', () => assertGetYearFromDate('2019-12-31', 2019));
    });

    describe('stringToDayMonthYear', () => {
      const assertStringToDayMonthYear = (date: string, expected: string) => {
        expect(stringToDayMonthYear(date)).toBe(expected);
      };

      it('should return 29 Feb 2020 when provided 2020-02-29', () =>
        assertStringToDayMonthYear('2020-02-29', '29 Feb 2020'));
      it('should return 1 Jan 2020 when provided 2020-01-01', () =>
        assertStringToDayMonthYear('2020-01-01', '1 Jan 2020'));
      it('should return 31 Dec 2020 when provided 2020-12-31', () =>
        assertStringToDayMonthYear('2020-12-31', '31 Dec 2020'));
      it('should return 31 Dec 2019 when provided 2019-12-31', () =>
        assertStringToDayMonthYear('2019-12-31', '31 Dec 2019'));
    });

    describe('stringToMonthYear', () => {
      const assertStringToMonthYear = (date: string, expected: string) => {
        expect(stringToMonthYear(date)).toBe(expected);
      };

      it('should return Feb 2020 when provided 2020-02-29', () => assertStringToMonthYear('2020-02-29', 'Feb 2020'));
      it('should return Jan 2020 when provided 2020-01-01', () => assertStringToMonthYear('2020-01-01', 'Jan 2020'));
      it('should return Dec 2020 when provided 2020-12-31', () => assertStringToMonthYear('2020-12-31', 'Dec 2020'));
      it('should return Dec 2019 when provided 2019-12-31', () => assertStringToMonthYear('2019-12-31', 'Dec 2019'));
    });

    describe('allMonthsBetweenDates', () => {
      const assertAllMonthsBetweenDates = (start: string, end: string, expected: string[]) => {
        expect(allMonthsBetweenDates(start, end)).toEqual(expected);
      };

      it('should return empty array when end is less than than start date', () =>
        assertAllMonthsBetweenDates('2020-01-01', '2019-12-31', []));
      it('should return a single month when month and year of the two dates are identical', () =>
        assertAllMonthsBetweenDates('2020-01-01', '2020-01-15', ['2020-01']));
      it('should return multiple months when end is greater than start date', () =>
        assertAllMonthsBetweenDates('2019-10-31', '2020-02-01', [
          '2019-10',
          '2019-11',
          '2019-12',
          '2020-01',
          '2020-02',
        ]));
      it('should return 13 months when end month is the same as start month, but has a different year', () =>
        assertAllMonthsBetweenDates('2019-06-15', '2020-06-02', [
          '2019-06',
          '2019-07',
          '2019-08',
          '2019-09',
          '2019-10',
          '2019-11',
          '2019-12',
          '2020-01',
          '2020-02',
          '2020-03',
          '2020-04',
          '2020-05',
          '2020-06',
        ]));
    });

    describe('allYearsBetweenDates', () => {
      const assertAllYearsBetweenDates = (start: string, end: string, expected: string[]) => {
        expect(allYearsBetweenDates(start, end)).toEqual(expected);
      };

      it('should return empty array when end is less than than start date', () =>
        assertAllYearsBetweenDates('2020-01-01', '2019-12-31', []));
      it('should return a single year when year of the two dates are identical', () =>
        assertAllYearsBetweenDates('2020-01-01', '2020-12-15', ['2020']));
      it('should return multiple years when end is greater than start date and they span multiple years', () =>
        assertAllYearsBetweenDates('2019-10-31', '2025-02-01', [
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024',
          '2025',
        ]));
    });

    describe('getEarliestDate', () => {
      it('should return the earliest date', () => {
        const dates = [undefined, null, '2019-01-15', '2019-01-02', '2019-02-01', '2020-01-01', '2018-04-04'];
        expect(getEarliestDate(dates).format('YYYY-MM-DD')).toBe('2018-04-04');
      });
    });

    describe('getLatestDate', () => {
      it('should return the latest date', () => {
        const dates = [undefined, null, '2019-01-15', '2019-01-02', '2019-02-01', '2020-01-01', '2018-04-04'];
        expect(getLatestDate(dates).format('YYYY-MM-DD')).toBe('2020-01-01');
      });
    });

    describe('getDateForOer', () => {
      it('should return the date in YYYY-MM-DD format', () => {
        expect(getDateForOer('07-23-2021')).toBe('2021-07-23');
      });
    });

    describe('getMonthDateForOer', () => {
      it('should return today when end of month is greater than today', () => {
        expect(getMonthDateForOer('2077-12-31')).toBe(moment().format('YYYY-MM-DD'));
      });

      it('should return end of month when it is less than today', () => {
        expect(getMonthDateForOer('2021-01')).toBe('2021-01-31');
      });
    });

    describe('getYearDateForOer', () => {
      it('should return today when end of year is greater than today', () => {
        expect(getYearDateForOer('2077-12-31')).toBe(moment().format('YYYY-MM-DD'));
      });

      it('should return end of year when it is less than today', () => {
        expect(getYearDateForOer('2020-01-05')).toBe('2020-12-31');
      });
    });
  });
});
