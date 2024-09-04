import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//data types
interface cartItem {
  id: string,
  name: string,
  price: number,
  artwork: string,
  quantity: number,
}
interface cartState{
    items: cartItem[],
    total: number,
    badge: number,
}
//initial state
const initialState: cartState = {
    items: [],
    total: 0,
    badge: 0,
};

//reducers
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItemToCart: (state, action: PayloadAction<cartItem>) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        const price = parseFloat(action.payload.price.toString()); // Ensure price is a number
  
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
  
        state.total += price;
        state.badge += 1;
      },
          removeItemFromCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            if (itemIndex >= 0) {
              if (state.items[itemIndex].quantity > 1) {
                state.items[itemIndex].quantity -= 1;
              } else {
                state.items.splice(itemIndex, 1);
              }
              state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
            }
            state.badge -= 1;
          },
          clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.badge = 0;
          },
        },
      });
      
  
  // Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

  export default cartSlice.reducer
  