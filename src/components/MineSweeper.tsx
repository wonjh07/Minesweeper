import styled from 'styled-components';
import { AiFillSmile, AiOutlineSmile } from 'react-icons/ai';
import Buttons from './Buttons';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initMineMap, initVstMap, setGameState } from '../store/minesSlice';
import OptionButton from './OptionButton';

const MineSwipper = () => {
  const option = useAppSelector((state) => state.mines.option);
  const dispatch = useAppDispatch();

  const resetMineMap = useCallback(() => {
    dispatch(initMineMap());
  }, [dispatch]);

  const resetVstMap = useCallback(() => {
    dispatch(initVstMap());
  }, [dispatch]);

  const stopGame = useCallback(() => {
    dispatch(setGameState(false));
  }, [dispatch]);

  const resetGame = useCallback(() => {
    resetMineMap();
    resetVstMap();
    stopGame();
  }, [resetMineMap, resetVstMap, stopGame]);

  useEffect(() => {
    resetGame();
  }, [resetGame, option]);

  return (
    <>
      <Container
        onContextMenu={(e) => {
          e.preventDefault();
        }}>
        <FlexBox>
          <GameBox>
            <OptionButton />
            <TimerBox>
              <Timer></Timer>
              <SmileBox
                onClick={() => {
                  resetGame();
                }}>
                <AiOutlineSmile
                  size={26}
                  style={{ position: 'relative', color: 'black' }}
                />
                <AiFillSmile
                  size={26}
                  style={{ position: 'absolute', color: 'yellow' }}
                />
              </SmileBox>
              <Timer></Timer>
            </TimerBox>
            <Buttons />
          </GameBox>
        </FlexBox>
      </Container>
    </>
  );
};

export default MineSwipper;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #b9b9b9;
`;

const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameBox = styled.div`
  width: auto;
  height: auto;
  background-color: #b9b9b9;
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 3px solid #606367;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  border-radius: 1px;
`;

const TimerBox = styled.div`
  width: 100%;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f1f3f4;
  border-right: 2px solid #f1f3f4;
  border-top: 3px solid #606367;
  border-left: 3px solid #606367;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

const Timer = styled.div`
  width: 3.2rem;
  height: 100%;
  background-color: black;
`;

const SmileBox = styled.div`
  height: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #606367;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  background-color: #b9b9b9;
  cursor: pointer;

  :active {
    border-bottom: 3px solid #f1f3f4;
    border-right: 3px solid #f1f3f4;
    border-top: 2px solid #606367;
    border-left: 2px solid #606367;
    background-color: #cccccc;
  }
`;
