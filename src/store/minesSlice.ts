import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { detectZeros, initMap } from '../components/utils';
interface OptionState {
  yNum: number;
  xNum: number;
  minesNum: number;
}

interface MineMapState {
  mineMap: number[][];
  vstMap: number[][];
  flags: number;
  option: OptionState;
  customOption: OptionState;
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
  flags: 0,
  option: {
    yNum: 8,
    xNum: 8,
    minesNum: 10,
  },
  customOption: {
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
    initVstMap: (state) => {
      state.vstMap = new Array<number[]>(state.option.yNum)
        .fill([])
        .map(() => new Array<number>(state.option.xNum).fill(0));
    },
    initMineMap: (state) => {
      state.mineMap = new Array<number[]>(state.option.yNum)
        .fill([])
        .map(() => new Array<number>(state.option.xNum).fill(0));
    },
    setMineMap: (state, action: PayloadAction<CoordinateState>) => {
      const [y, x] = [action.payload.yi, action.payload.xi];
      state.mineMap = initMap(
        state.option.yNum,
        state.option.xNum,
        y,
        x,
        state.option.minesNum,
      );
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
          state.option.xNum,
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
    setOptions: (state, action: PayloadAction<OptionState>) => {
      state.option = action.payload;
    },
    setCustomMode: (state) => {
      state.option = state.customOption;
    },
    setCustomOptions: (state, action: PayloadAction<OptionState>) => {
      state.customOption = action.payload;
    },
  },
});

export const {
  initMineMap,
  initVstMap,
  setMineMap,
  setVstMap,
  openBtn,
  setFlag,
  removeFlag,
  setGameState,
  setOptions,
  setCustomMode,
  setCustomOptions,
} = minesSlice.actions;
export default minesSlice.reducer;
