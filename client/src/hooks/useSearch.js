import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchHistory } from '../utils/storage';

export const useSearch = (searchFunction, delay = 500) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedQuery = useDebounce(query, delay);

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        const search = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await searchFunction(debouncedQuery);
                setResults(data);

                // Save to search history
                searchHistory.add(debouncedQuery);
            } catch (err) {
                setError(err.message || 'Search failed');
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        search();
    }, [debouncedQuery, searchFunction]);

    // Clear search
    const clear = () => {
        setQuery('');
        setResults([]);
        setError(null);
    };

    // Get search history
    const getHistory = () => {
        return searchHistory.get();
    };

    // Clear search history
    const clearHistory = () => {
        searchHistory.clear();
    };

    return {
        query,
        setQuery,
        results,
        loading,
        error,
        clear,
        getHistory,
        clearHistory,
    };
};

export default useSearch;