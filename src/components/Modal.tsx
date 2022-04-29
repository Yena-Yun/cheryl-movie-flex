import { useRecoilState } from 'recoil';
import { movieState } from 'state/movie';
import styled from 'styled-components';
import { ButtonFlexCenter, Flexbox, FlexCenter } from 'styles/commonStyles';

const Modal = (props: {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}) => {
  const [movie, setMovie] = useRecoilState(movieState);

  return (
    <Overlay onClick={() => props.setIsModal(false)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ButtonFlexCenter
          onClick={() => {
            props.setIsModal(!props.isModal);
            console.log(movie);
          }}
        >
          즐겨찾기
        </ButtonFlexCenter>
        <ButtonFlexCenter
          onClick={() => {
            setMovie([...movie.slice(0, movie.length - 1)]);
            console.log(movie);
            props.setIsModal(!props.isModal);
          }}
        >
          취소
        </ButtonFlexCenter>
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

const Container = styled(Flexbox)`
  width: 30rem;
  height: 10rem;
  background-color: #fff;
  border-radius: 1.5rem;
`;

export default Modal;
