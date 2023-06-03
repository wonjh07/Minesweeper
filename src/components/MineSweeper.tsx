import { useState } from 'react';
import styled from 'styled-components';

const MineSwipper = () => {
  const xNum = 16;
  const yNum = 12;
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
          {y}
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
  background-color: aquamarine;
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
  background-color: #e0e0e0;
  padding: 1rem;
  box-sizing: border-box;
  border: 2px solid black;
`;

const GridBox = styled.div<{ wd: number; ht: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  box-sizing: border-box;
  border-top: 2px solid;
  border-left: 2px solid;
  grid-template-columns: repeat(${(props) => props.wd}, 50px);
  grid-template-rows: repeat(${(props) => props.ht}, 50px);
`;

const Button = styled.div<{ checked: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.checked ? '#B9B9B9' : '#e0e0e0')};
  border-bottom: 2px solid;
  border-right: 2px solid;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;
