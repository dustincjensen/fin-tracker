import { useLocalStorage } from './use-local-storage.hook';

export type Feature = 'mortgage';

export const useFeatureEnabled = (feature: Feature) => {
    const [isFeatureEnabled] = useLocalStorage(`feature-${feature}`, false);
    return isFeatureEnabled;
};
