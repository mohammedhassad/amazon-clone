import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { items: Array<any> } = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: typeof initialState, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.items.findIndex(
        (basketItem: any) => basketItem.id === action.payload.id
      );

      const newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product ( id: ${action.payload.id} )`);
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: any) => state.basket.items;
export const selectTotal = (state: any) =>
  state.basket.items.reduce(
    (total: number, item: any) => total + item.price,
    0
  );

export default basketSlice.reducer;
