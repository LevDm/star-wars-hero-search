import React, { useState, useCallback } from 'react';
import { Person } from './types';


export const useSearchPerson = () => {
    const [searchResult, setSearchResult] = useState<Person[] | null>(null);

    const fetchData = useCallback(async (searchTerm: string) => {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
            const data = await response.json();

            if (data.results.length > 0) {
                setSearchResult(data.results);
            } else {
                setSearchResult(null);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult(null);
        }
    }, [])

    return { data: searchResult, fetchData: fetchData };
};