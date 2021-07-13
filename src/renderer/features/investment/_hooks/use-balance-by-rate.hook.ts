import * as React from 'react';
import { OpenExchangeRatesApi } from '../../../third-party-apis/open-exchange-rates/oer.api';
import * as dateUtils from '../../../utils/date.utils';

const openExchangeRatesApiKey = '473417c4f6e0437ebe45ff10020eab35';

export const useBalanceByRate = (balance: number, date: string, currency: string) => {
  const [rate, setRate] = React.useState<number>(undefined);
  const [convertedBalance, setConvertedBalance] = React.useState<number>(undefined);

  React.useEffect(() => {
    (async () => {
      if (!balance || !date || !currency) {
        setRate(undefined);
        setConvertedBalance(undefined);
        return;
      }

      const d = dateUtils.getDateForOer(date);
      const r = await OpenExchangeRatesApi.getRatesOn(openExchangeRatesApiKey, d);
      
      // TODO support other currencies...
      if (currency === 'USD') {
        const cadRate = parseFloat(r.rates.CAD.toPrecision(4));
        setRate(cadRate);
        setConvertedBalance(balance * cadRate);
      }
    })();
  }, [balance, date, currency]);

  return { convertedBalance, rate };
};