import * as React from 'react';
import { OpenExchangeRatesApi } from '../../../third-party-apis/open-exchange-rates/oer.api';
import * as dateUtils from '../../../utils/date.utils';

const openExchangeRatesApiKey = '473417c4f6e0437ebe45ff10020eab35';

interface IDateRate {
  date: string;
  rate: string;
  actualDate: string; // todo remove?
}

export const useRatesByDates = (dates: string[], byMonth: boolean, currency: string) => {
  const [rates, setRates] = React.useState<IDateRate[]>([]);
  
  React.useEffect(() => {
    (async () => {
      if (!dates || !currency) {
        setRates(undefined);
        return;
      }

      // TODO support other currencies...
      if (currency !== 'USD') {
        return;
      }

      const oerDates = dates.map(byMonth ? dateUtils.getMonthDateForOer : dateUtils.getYearDateForOer);
      const rates = await Promise.all(oerDates.map(d => OpenExchangeRatesApi.getRatesOn(openExchangeRatesApiKey, d)));

      const dateRates: IDateRate[] = [];
      for (let i = 0; i < dates.length; i++) {
        dateRates.push({ actualDate: dateUtils.getDateFromTimestamp(rates[i].timestamp * 1000), date: dates[i], rate: rates[i].rates.CAD.toPrecision(4) });
      }

      setRates(dateRates);

    })();
  }, [dates, currency]);

  return { rates };
};