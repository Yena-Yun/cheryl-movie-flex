import { useRecoilState } from 'recoil';
import { movieState } from 'state/movie';
import styled from 'styled-components';
import { ButtonFlexCenter, FlexCenter } from 'styles/commonStyles';

const Modal = (props: {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}) => {
  const [movie, setMovie] = useRecoilState(movieState);

  return (
    <Overlay onClick={() => props.setIsModal(false)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalBtn onClick={() => props.setIsModal(false)}>즐겨찾기</ModalBtn>
        <ModalBtn
          onClick={() => {
            if (movie.length > 0) {
              setMovie([...movie.slice(0, movie.length - 1)]);
            }
            props.setIsModal(false);
          }}
        >
          취소
        </ModalBtn>
      </Container>
    </Overlay>
  );
};

const Overlay = styled(FlexCenter)`
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled(FlexCenter)`
  width: 30rem;
  height: 10rem;
  background-color: #fff;
  border-radius: 1.5rem;
`;

const ModalBtn = styled(ButtonFlexCenter)`
  border: 1px solid tomato;
  border-radius: 4px;
  height: 30px;

  &:first-child {
    margin-right: 12px;
  }
`;

export default Modal;
