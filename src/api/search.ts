import { useState, useCallback } from 'react';
import { Person } from './types';


export const useSearchPerson = () => {
    const [searchResult, setSearchResult] = useState<Person[] | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (searchTerm: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
            const data = await response.json();

            setSearchResult(data.results);

        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult(null);
        } finally {
            setLoading(false);
        }
    }, [])

    return { data: searchResult, fetchData: fetchData, isLoading: loading};
};