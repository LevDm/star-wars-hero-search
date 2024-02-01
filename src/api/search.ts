import { useState, useCallback } from 'react';
import { Person } from './types';


export const useSearchPerson = () => {
    const [searchResult, setSearchResult] = useState<{data: Person[] | null, searchTerm: string | null}>({data: null, searchTerm: null});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (searchTerm: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
            const data = await response.json();

            setSearchResult({data: data.results, searchTerm: searchTerm});

        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult({data: null, searchTerm: searchTerm});
        } finally {
            setLoading(false);
        }
    }, [])

    return { data: searchResult.data, fetchData: fetchData, isLoading: loading, currentSearchTerm: searchResult.searchTerm};
};