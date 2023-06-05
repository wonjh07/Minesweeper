import styled from 'styled-components';
import {
  FaSadTear,
  FaRegSadTear,
  FaSmile,
  FaRegSmile,
  FaSmileWink,
  FaRegSmileWink,
} from 'react-icons/fa';
import Buttons from './Buttons';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetGame } from '../store/minesSlice';
import OptionButton from './OptionButton';
import Timer from './Timer';
import FlagCount from './FlagCount';
import SucessModal from './SucessModal';

const MineSwipper = () => {
  const option = useAppSelector((state) => state.mines.option);
  const status = useAppSelector((state) => state.mines.status);
  const dispatch = useAppDispatch();

  const reset = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  // option이 변경되면 맵을 초기화
  useEffect(() => {
    reset();
  }, [reset, option]);

  const getIcons = () => {
    if (status === 'fail') {
      return (
        <>
          <FaSadTear
            size={24}
            style={{ position: 'relative', color: 'yellow' }}
          />
          <FaRegSadTear
            size={24}
            style={{ position: 'absolute', color: 'black' }}
          />
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <FaSmileWink
            size={24}
            style={{ position: 'relative', color: 'yellow' }}
          />
          <FaRegSmileWink
            size={24}
            style={{ position: 'absolute', color: 'black' }}
          />
        </>
      );
    }

    return (
      <>
        <FaSmile size={24} style={{ position: 'relative', color: 'yellow' }} />
        <FaRegSmile
          size={24}
          style={{ position: 'absolute', color: 'black' }}
        />
      </>
    );
  };

  return (
    <>
      <Container
        onContextMenu={(e) => {
          e.preventDefault();
        }}>
        <SucessModal />
        <FlexBox>
          <GameBox>
            <OptionButton />
            <TimerBox>
              <BlackBox>
                <FlagCount />
              </BlackBox>
              <SmileBox
                onClick={() => {
                  reset();
                }}>
                {getIcons()}
              </SmileBox>
              <BlackBox>
                <Timer />
              </BlackBox>
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

const BlackBox = styled.div`
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
