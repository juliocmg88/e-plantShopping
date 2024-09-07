import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    disabledProducts: [],
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity ++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
          state.disabledProducts.push(name); // Add to disabled products
          console.log(state.disabledProducts);
        }
    },
    removeItem: (state, action) => {
        const { name } = action.payload;
        state.items = state.items.filter(item => item.name !== name);
        state.disabledProducts = state.disabledProducts.filter(name => name !== action.payload.name); // Remove from disabled products
        console.log(state.disabledProducts);
    },
    updateQuantity: (state, action) => {
        const { name, quantityChange } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity += quantityChange;
          // Remove item if quantity goes to 0 or below
          if (itemToUpdate.quantity <= 0) {
            state.items = state.items.filter(item => item.name !== name);
            state.disabledProducts = state.disabledProducts.filter(name => name !== action.payload.name);
            console.log(state.disabledProducts);
          }
        }
      },
      resetDisabledProducts: (state) => {
        state.disabledProducts = [];
        console.log(state.disabledProducts);
      },
  },
});

export const { addItem, removeItem, updateQuantity,resetDisabledProducts } = CartSlice.actions;
// Selector to get the total number of items
export const selectTotalItems = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector to get disabled products
export const selectDisabledProducts = (state) => state.cart.disabledProducts;

export default CartSlice.reducer;
