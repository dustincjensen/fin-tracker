import {
  Card,
  FormFieldDescription,
  FormFieldLabel,
  FormFieldValidationMessage,
  Pane,
  TextInput,
  TickCircleIcon,
} from 'evergreen-ui';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThirdPartyApiActions } from '../../../store/third-party-api/third-party-api.actions';
import { ThirdPartyApiSelectors } from '../../../store/third-party-api/third-party-api.selectors';
import { isNullOrWhitespace } from '../../../utils/object.utils';

export const OpenExchangeRatesApi = () => {
  const dispatch = useDispatch();
  const currentOerApiKey = useSelector(ThirdPartyApiSelectors.openExchangeRatesApiKey);
  const [oerApiKey, setOerApiKey] = useState(currentOerApiKey);
  const [oerApiKeyError, setOerApiKeyError] = useState(undefined);
  const [successfulSave, setSuccessfulSave] = useState(false);

  const handleApiKeyChange = evt => {
    setSuccessfulSave(false);
    setOerApiKey(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    setSuccessfulSave(false);

    if (!isNullOrWhitespace(oerApiKey) && oerApiKey.length !== 32) {
      setOerApiKeyError('API Key must be 32 characters in length');
      return;
    }
    setOerApiKeyError(undefined);

    dispatch(ThirdPartyApiActions.updateOerApiKey(oerApiKey));

    setSuccessfulSave(true);
  };

  return (
    <Card elevation={1} background='tint1' padding={10} border width={560} maxWidth={560} minHeight={125}>
      <form onSubmit={handleSubmit}>
        <Pane>
          <FormFieldLabel>Open Exchange Rates API Key</FormFieldLabel>
          <FormFieldDescription>
            Without an API Key USD accounts will not be able to be calculated correctly in CAD dollars.
          </FormFieldDescription>
          <Pane display='flex' alignItems='center' marginTop='5px'>
            <TextInput width={500} name='oerApiKey' value={oerApiKey} onChange={handleApiKeyChange} />
            {successfulSave && <TickCircleIcon color='success' marginLeft='10px' size={24} />}
          </Pane>
          {oerApiKeyError && <FormFieldValidationMessage marginTop='5px'>{oerApiKeyError}</FormFieldValidationMessage>}
        </Pane>
      </form>
    </Card>
  );
};
