import { useDebouncedValue } from '@mantine/hooks';
import { useEffect } from 'react';


export function useAutosave<T>(value: T, delay = 600, onSave?: (v: T) => void) {
    const [debounced] = useDebouncedValue(value, delay);
    useEffect(() => {
        if (onSave) onSave(debounced);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
}