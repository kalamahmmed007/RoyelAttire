import { useEffect, useRef } from 'react';

/**
 * Custom hook for detecting clicks outside a component
 * Useful for closing modals, dropdowns, etc.
 * 
 * @param {function} handler - Function to call when clicked outside
 * @returns {ref} - Ref to attach to the component
 */
const useClickOutside = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;