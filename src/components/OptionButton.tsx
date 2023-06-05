import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCustomMode,
  setCustomOptions,
  setOptions,
} from '../store/minesSlice';

const OptionButton = () => {
  const options = useAppSelector((state) => state.mines.customOption);
  const [open, setOpen] = useState('');
  const dispatch = useAppDispatch();

  const beginnerOption = () => {
    dispatch(setOptions({ yNum: 8, xNum: 8, minesNum: 10 }));
    setOpen('');
  };

  const interOption = () => {
    dispatch(setOptions({ yNum: 16, xNum: 16, minesNum: 40 }));
    setOpen('');
  };

  const expertOption = () => {
    dispatch(setOptions({ yNum: 16, xNum: 32, minesNum: 99 }));
    setOpen('');
  };

  const customOption = () => {
    dispatch(setCustomMode());
    setOpen('');
  };

  const changeCustomOption = (
    target: 'yNum' | 'xNum' | 'minesNum',
    data: number,
  ) => {
    dispatch(setCustomOptions({ target, data }));
  };

  const optionOpen = (opt: string) => {
    if (open === opt) {
      setOpen('');
    } else {
      setOpen(opt);
    }
  };

  return (
    <>
      <Container>
        <OptionBtn
          onClick={() => {
            optionOpen('game');
          }}>
          Game
        </OptionBtn>
        <OptionBtn
          onClick={() => {
            optionOpen('option');
          }}>
          Custom Option
        </OptionBtn>
        {open === 'game' && (
          <GameOptBox>
            <OptionBtn onClick={beginnerOption}>Beginner</OptionBtn>
            <OptionBtn onClick={interOption}>Intermidiate</OptionBtn>
            <OptionBtn onClick={expertOption}>Expert</OptionBtn>
            <OptionBtn onClick={customOption}>Custom</OptionBtn>
          </GameOptBox>
        )}
        {open === 'option' && (
          <CustomOptBox>
            <CustomOption>
              <CustomText>Width:</CustomText>
              <CustomInput
                type="number"
                defaultValue={options.xNum}
                onChange={(e) => {
                  changeCustomOption('xNum', Number(e.target.value));
                }}
              />
              <CustomText>(8~50)</CustomText>
            </CustomOption>
            <CustomOption>
              <CustomText>Height:</CustomText>
              <CustomInput
                type="number"
                defaultValue={options.yNum}
                onChange={(e) => {
                  changeCustomOption('yNum', Number(e.target.value));
                }}
              />
              <CustomText>(8~50)</CustomText>
            </CustomOption>
            <CustomOption>
              <CustomText>Mines:</CustomText>
              <CustomInput
                type="number"
                defaultValue={options.minesNum}
                onChange={(e) => {
                  changeCustomOption('minesNum', Number(e.target.value));
                }}
              />
              <CustomText>(10~883)</CustomText>
              <WarnText>지뢰의 갯수는 전체의 1/3을 넘을수 없습니다</WarnText>
            </CustomOption>
          </CustomOptBox>
        )}
      </Container>
    </>
  );
};

export default OptionButton;

const Container = styled.div`
  width: 100%;
  height: 1.4rem;
  display: flex;
  align-items: start;
  justify-content: start;
`;

const OptionBtn = styled.div`
  position: relative;
  top: -2px;
  left: -3px;
  border-radius: 2px;
  padding: 2px 4px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: gray;
  }

  &:active {
    opacity: 0.5;
  }
`;

const GameOptBox = styled.div`
  position: absolute;
  transform: translateX(-0.62rem) translateY(-6.6rem);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 4px;
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #b9b9b9;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  font-size: 0.9rem;
`;

const CustomOptBox = styled.div`
  position: absolute;
  transform: translateX(-0.62rem) translateY(-6.6rem);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 10px;
  width: 10.346rem;
  height: 5rem;
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #b9b9b9;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  font-size: 0.9rem;
`;

const CustomOption = styled.div`
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 0.4rem;
`;

const CustomText = styled.div`
  width: 2.5rem;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: end;
  justify-content: start;
`;

const WarnText = styled.div`
  position: absolute;
  transform: translateX(11.5rem) translateY(-2.5rem);
  width: 200%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: end;
  justify-content: start;
  color: #d63725;
`;

const CustomInput = styled.input`
  width: 2.5rem;
  height: 100%;
  padding: 0 0.3rem;
  appearance: none;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }
`;
