import { useEffect } from 'react';

//  Hook to close when clicking outside of a ref element

export const useClickOutside = (ref: React.RefObject<HTMLElement | null>, onClose: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
};
