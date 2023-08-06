import React from 'react';
import { useSelector } from 'react-redux';
import { ThirdPartyApiSelectors } from '../../../store/third-party-api/third-party-api.selectors';
import { OpenExchangeRatesApi } from '../../../third-party-apis/open-exchange-rates/oer.api';
import * as dateUtils from '../../../utils/date.utils';

export const useBalanceByRate = (balance: number, date: string, currency: string) => {
    const oerApiKey = useSelector(ThirdPartyApiSelectors.openExchangeRatesApiKey);
    const [rate, setRate] = React.useState<number>(undefined);
    const [convertedBalance, setConvertedBalance] = React.useState<number>(undefined);

    React.useEffect(() => {
        (async () => {
            if (!balance || !date || !currency || !oerApiKey) {
                setRate(undefined);
                // TODO better way to handle this?
                // We return the balance just in case we don't have the api key, then we can still see the
                // approximated addition of the multiple balances added together.
                setConvertedBalance(balance);
                return;
            }

            const d = dateUtils.getDateForOer(date);
            const r = await OpenExchangeRatesApi.getRatesOn(oerApiKey, d);

            // TODO support other currencies...
            if (currency === 'USD') {
                const cadRate = parseFloat(r.rates.CAD.toPrecision(4));
                setRate(cadRate);
                setConvertedBalance(balance * cadRate);
            }
        })();
    }, [balance, date, currency, oerApiKey]);

    return { convertedBalance, rate };
};
