import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    total: 0,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.items.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        clearOrders: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
