export class ThirdPartyApiActions {
  public static UPDATE_OER_API_KEY = 'UPDATE_OER_API_KEY';

  public static updateOerApiKey = (apiKey: string) => ({
    type: ThirdPartyApiActions.UPDATE_OER_API_KEY,
    payload: apiKey
  });
}