import { useState, useEffect } from 'react';

export const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState({
        x: 0,
        y: 0,
    });
    const [scrollDirection, setScrollDirection] = useState('up');
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        let ticking = false;
        let scrollTimeout;

        const updateScrollPosition = () => {
            const currentScrollY = window.pageYOffset;
            const currentScrollX = window.pageXOffset;

            setScrollPosition({
                x: currentScrollX,
                y: currentScrollY,
            });

            // Determine scroll direction
            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            lastScrollY = currentScrollY;
            ticking = false;

            // Set scrolling state
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // Scroll to top
    const scrollToTop = (smooth = true) => {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto',
        });
    };

    // Scroll to position
    const scrollTo = (x, y, smooth = true) => {
        window.scrollTo({
            top: y,
            left: x,
            behavior: smooth ? 'smooth' : 'auto',
        });
    };

    // Check if at top
    const isAtTop = scrollPosition.y === 0;

    // Check if at bottom
    const isAtBottom =
        window.innerHeight + scrollPosition.y >= document.documentElement.scrollHeight - 10;

    return {
        scrollPosition,
        scrollDirection,
        isScrolling,
        isAtTop,
        isAtBottom,
        scrollToTop,
        scrollTo,
    };
};

// Hook for detecting if element is in viewport
export const useInView = (ref, options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasBeenInView(true);
                if (options.once) {
                    observer.disconnect();
                }
            }
        }, options);

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return { isInView, hasBeenInView };
};

export default useScroll;