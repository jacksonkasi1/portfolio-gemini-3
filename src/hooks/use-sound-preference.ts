// ** import lib
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-sound-enabled';

/**
 * Hook to manage global sound preference
 * Persists to localStorage and provides toggle functionality
 */
export const useSoundPreference = () => {
    const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true;
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === null ? true : stored === 'true';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(isSoundEnabled));
    }, [isSoundEnabled]);

    const toggleSound = useCallback(() => {
        setIsSoundEnabled(prev => !prev);
    }, []);

    const setSoundEnabled = useCallback((enabled: boolean) => {
        setIsSoundEnabled(enabled);
    }, []);

    return { isSoundEnabled, toggleSound, setSoundEnabled };
};

/**
 * Utility to check sound preference without React state
 */
export const getSoundPreference = (): boolean => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === 'true';
};
