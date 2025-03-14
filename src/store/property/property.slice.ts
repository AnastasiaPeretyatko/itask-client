import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  property: any
}

const initialState: TInitialState = {
  property: {},
};

export const property = createSlice({
  name: 'property',
  initialState,
  reducers: {
    add: (state, action) => {
      state.property = action.payload;
    },
    change: (state, action) => {
      state.property = action.payload;
    },
  },
});


export const propertyModule = property.actions;

export default property.reducer;
