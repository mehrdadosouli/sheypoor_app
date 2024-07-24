import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const dataSlice = createSlice({
  name: 'productDivar',
  initialState,
  reducers: {
    increment: (state, action) => {
        state.products.push(action.payload);
    },
    decrement: (state, action) => { 
    //   state.value -= 1
    },
    incrementByAmount: (state, action) => {
    //   state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = dataSlice.actions
export default dataSlice.reducer