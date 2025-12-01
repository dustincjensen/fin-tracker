import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RecordSelectors } from '../../store/record/record.selectors';

export const useEditDetails = () => {
    const records = useSelector(RecordSelectors.records);

    const suggestions = useMemo(() => {
        const allRecords = Object.keys(records)
            .map(id => records[id])
            .reduce((prev, curr) => [...prev, ...curr], [])
            .sort((r1, r2) => ((r1?.details || '') < (r2?.details || '') ? -1 : 1));

        // Don't try to lowercase here because you want your suggestion to have proper casing.
        return [...new Set(allRecords.map(r => r.details || ''))];
    }, [records]);

    return { suggestions };
};
