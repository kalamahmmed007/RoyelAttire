import { useState, useEffect } from 'react';

export const useIdle = (timeout = 5000) => {
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        let timeoutId;

        const resetTimer = () => {
            setIsIdle(false);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setIsIdle(true), timeout);
        };

        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click',
        ];

        // Add event listeners
        events.forEach((event) => {
            document.addEventListener(event, resetTimer, true);
        });

        // Start timer
        resetTimer();

        // Cleanup
        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, resetTimer, true);
            });
            clearTimeout(timeoutId);
        };
    }, [timeout]);

    return isIdle;
};

export default useIdle;