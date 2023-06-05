import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { failGame, setTimeUp } from '../store/minesSlice';

const Timer = () => {
  const status = useAppSelector((state) => state.mines.status);
  const time = useAppSelector((state) => state.mines.time);
  const [timeStr, setTimeStr] = useState('000');
  const dispatch = useAppDispatch();

  const timeUp = useCallback(() => {
    dispatch(setTimeUp());
  }, [dispatch]);

  const mineBombs = useCallback(() => {
    dispatch(failGame());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'started') {
      const timer = setInterval(() => {
        timeUp();
      }, 1000);
      return () => clearInterval(timer);
    } else if (status === 'idle') {
      setTimeStr('000');
    } else if (status === 'fail' || status === 'sucess') {
      console.log('finish');
    }
  }, [status, timeUp]);

  useEffect(() => {
    if (time === 999) {
      mineBombs();
    }
    setTimeStr(time.toString().padStart(3, '0'));
  }, [time, mineBombs]);

  return (
    <>
      <Component>
        <Number>{timeStr[0]}</Number>
        <Number>{timeStr[1]}</Number>
        <Number>{timeStr[2]}</Number>
      </Component>
    </>
  );
};

export default Timer;

const Component = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 0.3rem;
  user-select: none;
`;

const Number = styled.div`
  width: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 1.4rem;
`;
