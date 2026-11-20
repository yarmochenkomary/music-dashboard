import { createContext, useContext, useState, useCallback } from 'react';

const INITIAL_FILTERS = {
    search: '',
    genre: 'All',
    limit: 15
};

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const updateFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
    }, []);

    return (
        <FilterContext.Provider value={{ filters, INITIAL_FILTERS, updateFilters, resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    return useContext(FilterContext);
}