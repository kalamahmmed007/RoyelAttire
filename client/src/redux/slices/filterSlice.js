import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    category: '',
    categories: [],
    priceRange: {
        min: 0,
        max: 10000,
    },
    rating: 0,
    sort: 'createdAt',
    inStock: false,
    brands: [],
    page: 1,
    limit: 12,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
            state.page = 1;
        },

        setCategory: (state, action) => {
            state.category = action.payload;
            state.page = 1;
        },

        setCategories: (state, action) => {
            state.categories = action.payload;
            state.page = 1;
        },

        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
            state.page = 1;
        },

        setRating: (state, action) => {
            state.rating = action.payload;
            state.page = 1;
        },

        setSort: (state, action) => {
            state.sort = action.payload;
            state.page = 1;
        },

        toggleInStock: (state) => {
            state.inStock = !state.inStock;
            state.page = 1;
        },

        setBrands: (state, action) => {
            state.brands = action.payload;
            state.page = 1;
        },

        toggleBrand: (state, action) => {
            const brand = action.payload;
            const index = state.brands.indexOf(brand);

            if (index > -1) {
                state.brands.splice(index, 1);
            } else {
                state.brands.push(brand);
            }
            state.page = 1;
        },

        setPage: (state, action) => {
            state.page = action.payload;
        },

        setLimit: (state, action) => {
            state.limit = action.payload;
            state.page = 1;
        },

        resetFilters: (state) => {
            return initialState;
        },

        setFilters: (state, action) => {
            return { ...state, ...action.payload, page: 1 };
        },
    },
});

export const {
    setSearch,
    setCategory,
    setCategories,
    setPriceRange,
    setRating,
    setSort,
    toggleInStock,
    setBrands,
    toggleBrand,
    setPage,
    setLimit,
    resetFilters,
    setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;