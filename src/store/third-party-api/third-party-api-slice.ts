import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThirdPartyApiStore = {
    /**
     * The API key for open exchange rates.
     */
    openExchangeRatesApiKey: string;
};

const initialState: ThirdPartyApiStore = { openExchangeRatesApiKey: undefined };

export const thirdPartyApiSlice = createSlice({
    name: 'thirdPartyApi',
    initialState,
    reducers: {
        updateOerApiKey: (state, { payload: apiKey }: PayloadAction<string>) => {
            state.openExchangeRatesApiKey = apiKey;
        },
    },
});

export const { updateOerApiKey } = thirdPartyApiSlice.actions;

export const thirdPartyApiReducer = thirdPartyApiSlice.reducer;
