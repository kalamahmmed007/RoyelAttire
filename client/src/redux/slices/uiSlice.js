import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebar: false,
    cartDrawer: false,
    mobileMenu: false,
    searchModal: false,
    filterModal: false,
    quickViewModal: false,
    quickViewProduct: null,
    theme: localStorage.getItem('theme') || 'light',
    loading: false,
    notification: {
        show: false,
        message: '',
        type: 'info', // 'success', 'error', 'warning', 'info'
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },

        toggleCartDrawer: (state) => {
            state.cartDrawer = !state.cartDrawer;
        },

        toggleMobileMenu: (state) => {
            state.mobileMenu = !state.mobileMenu;
        },

        toggleSearchModal: (state) => {
            state.searchModal = !state.searchModal;
        },

        toggleFilterModal: (state) => {
            state.filterModal = !state.filterModal;
        },

        openQuickView: (state, action) => {
            state.quickViewModal = true;
            state.quickViewProduct = action.payload;
        },

        closeQuickView: (state) => {
            state.quickViewModal = false;
            state.quickViewProduct = null;
        },

        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
            document.documentElement.classList.toggle('dark', action.payload === 'dark');
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        showNotification: (state, action) => {
            state.notification = {
                show: true,
                message: action.payload.message,
                type: action.payload.type || 'info',
            };
        },

        hideNotification: (state) => {
            state.notification.show = false;
        },

        closeAllModals: (state) => {
            state.sidebar = false;
            state.cartDrawer = false;
            state.mobileMenu = false;
            state.searchModal = false;
            state.filterModal = false;
            state.quickViewModal = false;
            state.quickViewProduct = null;
        },
    },
});

export const {
    toggleSidebar,
    toggleCartDrawer,
    toggleMobileMenu,
    toggleSearchModal,
    toggleFilterModal,
    openQuickView,
    closeQuickView,
    setTheme,
    setLoading,
    showNotification,
    hideNotification,
    closeAllModals,
} = uiSlice.actions;

export default uiSlice.reducer;