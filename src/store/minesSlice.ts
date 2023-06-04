import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MineMapState {
  mineMap: number[][];
}

const initialState: MineMapState = {
  mineMap: [
    [0, 0],
    [0, 0],
  ],
};

export const minesSlice = createSlice({
  name: 'mines',
  initialState: initialState,
  reducers: {
    setMineMap: (state, action: PayloadAction<number[][]>) => {
      state.mineMap = action.payload;
    },
  },
});

export const { setMineMap } = minesSlice.actions;
export default minesSlice.reducer;
