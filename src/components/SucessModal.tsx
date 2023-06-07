import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGameState } from '../store/minesSlice';
import styled from 'styled-components';

const SucessModal = () => {
  const buttons = useAppSelector((state) => state.mines.buttons);
  const time = useAppSelector((state) => state.mines.time);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const finishGame = useCallback(() => {
    dispatch(setGameState('success'));
  }, [dispatch]);

  // 지뢰를 제외한 모든 버튼을 클릭하면 게임에 성공
  useEffect(() => {
    if (buttons === 0) {
      finishGame();
      setOpen(true);
    }
  }, [buttons, finishGame]);

  return (
    <>
      {open && (
        <Container>
          <Modal>
            <Title>Congraturation!</Title>
            <Desc>You cleared this level in {time} seconds!</Desc>
            <CloseBtn
              onClick={() => {
                setOpen(false);
              }}>
              Close
            </CloseBtn>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default SucessModal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  aspect-ratio: 1.5;
  box-sizing: border-box;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 3px solid #606367;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  border-radius: 1px;
  background-color: #b9b9b9;
`;

const Title = styled.p`
  font-size: 2.2rem;
`;

const Desc = styled.p`
  font-size: 1.2rem;
`;

const CloseBtn = styled.button`
  scale: 1.1;
  background-color: #b9b9b9;
  border-bottom: 3px solid #606367;
  border-right: 3px solid #606367;
  border-top: 2px solid #f1f3f4;
  border-left: 2px solid #f1f3f4;
  cursor: pointer;
  &:active {
    opacity: 0.7;
    border-bottom: 3px solid #f1f3f4;
    border-right: 3px solid #f1f3f4;
    border-top: 2px solid #606367;
    border-left: 2px solid #606367;
  }
`;
