import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchData: "",
  filterData: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.products = action.payload;
    },
    searchData(state, action) {
      (state.searchData = action.payload),
        (state.filterData = state.products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(state.searchData.toLocaleLowerCase())
        ));
    },
  },
});
export const { setProduct, searchData, filterData } = productSlice.actions;
export default productSlice.reducer;
