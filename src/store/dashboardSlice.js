import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_FILTERS = {
    search: '',
    genre: 'All',
    limit: 15
};

const initialState = {
    theme: 'light',
    filters: INITIAL_FILTERS,
    favorites: ['101', '107'], // Зберігаємо ID обраних треків
    chartType: 'bar' // 'bar' (стовпчиковий) або 'line' (лінійний)
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters(state) {
            state.filters = INITIAL_FILTERS;
        },
        toggleFavorite(state, action) {
            const trackId = String(action.payload);
            const exists = state.favorites.includes(trackId);
            if (exists) {
                state.favorites = state.favorites.filter((id) => id !== trackId);
            } else {
                state.favorites.push(trackId);
            }
        },
        setChartType(state, action) {
            state.chartType = action.payload;
        }
    }
});

export const {
    toggleTheme,
    setFilters,
    resetFilters,
    toggleFavorite,
    setChartType
} = dashboardSlice.actions;

export const selectTheme = (state) => state.dashboard.theme;
export const selectFilters = (state) => state.dashboard.filters;
export const selectFavorites = (state) => state.dashboard.favorites;
export const selectChartType = (state) => state.dashboard.chartType;

export default dashboardSlice.reducer;