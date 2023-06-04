import { useState } from 'react';
import styled from 'styled-components';
import { BsFlag, BsFillFlagFill } from 'react-icons/bs';

const MineSwipper = () => {
  const xNum = 16;
  const yNum = 16;
  const lst = new Array<number[]>(xNum)
    .fill([])
    .map(() => new Array<number>(yNum).fill(0));
  const [mineMap, setMineMap] = useState<number[][]>(lst);

  const btnState = (xi: number, yi: number) => {
    const temp = [...mineMap];
    if (temp[xi][yi] === 0) {
      temp[xi][yi] = 1;
    }
    setMineMap(temp);
  };

  const btnFlag = (xi: number, yi: number) => {
    const temp = [...mineMap];
    if (temp[xi][yi] === 0) {
      temp[xi][yi] = 2;
    } else if (temp[xi][yi] === 2) {
      temp[xi][yi] = 0;
    }
    setMineMap(temp);
  };

  const spawnBtn = () => {
    return mineMap.map((x, xi) =>
      x.map((y, yi) => (
        <Button
          key={`${xi} ${yi}`}
          checked={y === 1}
          onContextMenu={(e) => {
            e.preventDefault();
            btnFlag(xi, yi);
          }}
          onClick={() => {
            btnState(xi, yi);
          }}>
          {y === 2 && (
            <Flag>
              <BsFillFlagFill
                size={12}
                style={{ position: 'absolute', color: '#D63725' }}
              />
              <BsFlag
                size={12}
                style={{ position: 'relative', color: '#303031' }}
              />
            </Flag>
          )}
        </Button>
      )),
    );
  };

  return (
    <>
      <Container
        onContextMenu={(e) => {
          e.preventDefault();
        }}>
        <FlexBox>
          <GameBox>
            <TimerBox>
              <Timer></Timer>
              <SmileBox></SmileBox>
              <Timer></Timer>
            </TimerBox>
            <GridBox wd={xNum} ht={yNum}>
              {spawnBtn()}
            </GridBox>
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
  font-size: 0.6rem;
  font-weight: bold;
  user-select: none;
  padding-top: 2px;
  transition: 0.1s;
  cursor: pointer;
`;

const Flag = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimerBox = styled.div`
  width: 100%;
  height: 40px;
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
  width: 20%;
  height: 100%;
  background-color: black;
`;

const SmileBox = styled.div`
  height: 100%;
  box-sizing: border-box;
  aspect-ratio: 1;
  border-bottom: 3px solid #606367;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  cursor: pointer;
`;
