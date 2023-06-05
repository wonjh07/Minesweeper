import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  detectZeros,
  flagsFinder,
  initMap,
  minesFinder,
} from '../components/utils';

interface OptionState {
  yNum: number;
  xNum: number;
  minesNum: number;
}

interface MineMapState {
  mineMap: number[][];
  vstMap: number[][];
  flags: number;
  time: number;
  buttons: number;
  option: OptionState;
  customOption: OptionState;
  status: 'started' | 'idle' | 'fail' | 'success';
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
  time: 0,
  buttons: 64,
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
  status: 'idle',
};

export const minesSlice = createSlice({
  name: 'mines',
  initialState: initialState,
  reducers: {
    resetGame: (state) => {
      state.vstMap = new Array<number[]>(state.option.yNum)
        .fill([])
        .map(() => new Array<number>(state.option.xNum).fill(0));
      state.mineMap = new Array<number[]>(state.option.yNum)
        .fill([])
        .map(() => new Array<number>(state.option.xNum).fill(0));
      state.flags = 0;
      state.time = 0;
      state.status = 'idle';
    },
    setMineMap: (state, action: PayloadAction<CoordinateState>) => {
      const [y, x] = [action.payload.yi, action.payload.xi];
      state.buttons =
        state.option.yNum * state.option.xNum - state.option.minesNum;
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
        state.buttons -= detectZeros(
          state.mineMap,
          state.vstMap,
          y,
          x,
          state.option.yNum,
          state.option.xNum,
        );
        state.flags = flagsFinder(
          state.vstMap,
          state.option.yNum,
          state.option.xNum,
        );
      } else {
        state.vstMap[y][x] = 1;
        state.buttons -= 1;
      }
    },
    setTimeUp: (state) => {
      state.time++;
    },
    setFlag: (state, action: PayloadAction<CoordinateState>) => {
      state.vstMap[action.payload.yi][action.payload.xi] = 2;
      state.flags++;
    },
    removeFlag: (state, action: PayloadAction<CoordinateState>) => {
      state.vstMap[action.payload.yi][action.payload.xi] = 0;
      state.flags--;
    },
    setGameState: (
      state,
      action: PayloadAction<'started' | 'idle' | 'fail' | 'success'>,
    ) => {
      state.status = action.payload;
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
    failGame: (state) => {
      minesFinder(
        state.mineMap,
        state.vstMap,
        state.option.yNum,
        state.option.xNum,
      );
      state.status = 'fail';
    },
  },
});

export const {
  resetGame,
  setMineMap,
  setVstMap,
  openBtn,
  setTimeUp,
  setFlag,
  removeFlag,
  setGameState,
  setOptions,
  setCustomMode,
  setCustomOptions,
  failGame,
} = minesSlice.actions;
export default minesSlice.reducer;
