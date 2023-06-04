import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useCallback } from 'react';
import {
  openBtn,
  removeFlag,
  setFlag,
  setGameState,
  setMineMap,
} from '../store/minesSlice';
import { initMap, textColor } from './utils';
import { FaBomb } from 'react-icons/fa';
import { BsFillFlagFill, BsFlag } from 'react-icons/bs';

const Buttons = () => {
  const mineMap = useAppSelector((state) => state.mines.mineMap);
  const vstMap = useAppSelector((state) => state.mines.vstMap);
  const started = useAppSelector((state) => state.mines.started);
  const dispatch = useAppDispatch();
  const { yNum, xNum, minesNum } = useAppSelector(
    (state) => state.mines.option,
  );

  const newMinesMap = useCallback(
    (sy: number, sx: number) => {
      const temp = initMap(yNum, xNum, sy, sx, minesNum);
      dispatch(setMineMap(temp));
    },
    [dispatch, yNum, xNum, minesNum],
  );

  const startGame = () => {
    dispatch(setGameState(true));
  };

  const failGame = () => {};

  const btnState = (yi: number, xi: number) => {
    if (!started) {
      newMinesMap(yi, xi);
      startGame();
    }
    if (vstMap[yi][xi] === 0) {
      dispatch(openBtn({ yi, xi }));
    }
    if (vstMap[yi][xi] === -1) {
      failGame();
    }
  };

  const btnFlag = (yi: number, xi: number) => {
    if (vstMap[yi][xi] === 0) {
      dispatch(setFlag({ yi, xi }));
    } else if (vstMap[yi][xi] === 2) {
      dispatch(removeFlag({ yi, xi }));
    }
  };

  const spawnBtn = () => {
    return vstMap.map((y, yi) =>
      y.map((x, xi) => (
        <Button
          key={`${yi} ${xi}`}
          checked={x === 1}
          onContextMenu={(e) => {
            e.preventDefault();
            btnFlag(yi, xi);
          }}
          onClick={() => {
            btnState(yi, xi);
          }}>
          {x === 1 && (
            <BtnNums style={{ color: textColor(mineMap[yi][xi]) }}>
              {mineMap[yi][xi] > 0 && mineMap[yi][xi]}
              {mineMap[yi][xi] === 0 && null}
              {mineMap[yi][xi] === -1 && (
                <FaBomb size={16} style={{ marginBottom: '3px' }} />
              )}
            </BtnNums>
          )}
          {x === 2 && (
            <Flag>
              <BsFillFlagFill
                size={14}
                style={{ position: 'absolute', color: 'red' }}
              />
              <BsFlag
                size={14}
                style={{ position: 'relative', color: 'black' }}
              />
            </Flag>
          )}
        </Button>
      )),
    );
  };

  return (
    <>
      <GridBox wd={xNum} ht={yNum}>
        {spawnBtn()}
      </GridBox>
    </>
  );
};

export default Buttons;

const GridBox = styled.div<{ wd: number; ht: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  box-sizing: border-box;
  border-bottom: 2px solid #f1f3f4;
  border-right: 2px solid #f1f3f4;
  border-top: 3px solid #606367;
  border-left: 3px solid #606367;
  grid-template-columns: repeat(${(props) => props.wd}, 1.2rem);
  grid-template-rows: repeat(${(props) => props.ht}, 1.2rem);
  grid-gap: 1px;
  background-color: gray;
  border-radius: 1px;
`;

const Button = styled.div<{ checked: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  background-color: ${(props) => (props.checked ? '#cccccc' : '#B9B9B9')};
  border-radius: ${(props) => (props.checked ? '' : '1px')};
  border-bottom: ${(props) => (props.checked ? '' : '2px solid #606367')};
  border-right: ${(props) => (props.checked ? '' : '2px solid #606367')};
  border-top: ${(props) => (props.checked ? '' : '2px solid #f1f3f4')};
  border-left: ${(props) => (props.checked ? '' : '2px solid #f1f3f4')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  user-select: none;
  transition: 0.05s;
  cursor: pointer;
`;

const BtnNums = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Flag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
