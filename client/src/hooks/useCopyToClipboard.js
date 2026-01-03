import { useState } from 'react';
import toast from 'react-hot-toast';

export const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState(null);

    const copy = async (text) => {
        if (!navigator?.clipboard) {
            toast.error('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            toast.success('Copied to clipboard!');
            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            setCopiedText(null);
            toast.error('Failed to copy');
            return false;
        }
    };

    return [copiedText, copy];
};

export default useCopyToClipboard;