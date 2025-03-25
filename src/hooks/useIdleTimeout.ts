import { useEffect, useRef } from 'react';

const useIdleTimeout = (onTimeout: () => void, timeout: number = 300000) => { // 5 minutos por defecto
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(onTimeout, timeout);
    };

    useEffect(() => {
        const handleActivity = () => resetTimeout();

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        resetTimeout();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [timeout, onTimeout]);

    return null;
};

export default useIdleTimeout;