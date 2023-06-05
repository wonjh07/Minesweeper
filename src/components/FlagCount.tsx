import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';

const FlagCount = () => {
  const flags = useAppSelector((state) => state.mines.flags);
  const [cnt, setCnt] = useState('000');

  useEffect(() => {
    setCnt(flags.toString().padStart(3, '0'));
  }, [flags]);

  return (
    <>
      <Component>
        <Number>{cnt[0]}</Number>
        <Number>{cnt[1]}</Number>
        <Number>{cnt[2]}</Number>
      </Component>
    </>
  );
};

export default FlagCount;

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
