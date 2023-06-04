import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { detectZeros } from '../components/utils';
interface OptionState {
  yNum: number;
  xNum: number;
  minesNum: number;
}

interface MineMapState {
  mineMap: number[][];
  vstMap: number[][];
  option: OptionState;
  started: boolean;
}

interface CoordinateState {
  yi: number;
  xi: number;
}

const initialState: MineMapState = {
  mineMap: [
    [0, 0],
    [0, 0],
  ],
  vstMap: [
    [0, 0],
    [0, 0],
  ],
  option: {
    yNum: 8,
    xNum: 8,
    minesNum: 10,
  },
  started: false,
};

export const minesSlice = createSlice({
  name: 'mines',
  initialState: initialState,
  reducers: {
    setMineMap: (state, action: PayloadAction<number[][]>) => {
      state.mineMap = action.payload;
    },
    setVstMap: (state, action: PayloadAction<number[][]>) => {
      state.vstMap = action.payload;
    },
    openBtn: (state, action: PayloadAction<CoordinateState>) => {
      const [y, x] = [action.payload.yi, action.payload.xi];
      const value = state.mineMap[y][x];
      if (value === 0) {
        detectZeros(
          state.mineMap,
          state.vstMap,
          y,
          x,
          state.option.yNum,
          state.option.yNum,
        );
      }
      state.vstMap[y][x] = 1;
    },
    setFlag: (state, action: PayloadAction<CoordinateState>) => {
      state.vstMap[action.payload.yi][action.payload.xi] = 2;
    },
    removeFlag: (state, action: PayloadAction<CoordinateState>) => {
      state.vstMap[action.payload.yi][action.payload.xi] = 0;
    },
    setGameState: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
  },
});

export const {
  setMineMap,
  setVstMap,
  openBtn,
  setFlag,
  removeFlag,
  setGameState,
} = minesSlice.actions;
export default minesSlice.reducer;
