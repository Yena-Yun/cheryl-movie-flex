import { useState } from 'react';
import styled from 'styled-components';
import Search from './components/Search';
import Favorites from 'components/Favorites';
import Tab from 'components/Tab';
import { FlexColumn, TextBox } from 'styles/commonStyles';
import { fontSizes, fontWeights, colors } from 'styles/theme';
import Modal from 'components/Modal';

function App() {
  const [isSearch, setIsSearch] = useState(true);
  const [isModal, setIsModal] = useState(false);

  return (
    <Container>
      <TextBox size={fontSizes.title} weight={fontWeights.title} center>
        CheryFlex
      </TextBox>
      {isSearch ? <Search setIsModal={setIsModal} /> : <Favorites />}
      <Tab isSearch={isSearch} setIsSearch={setIsSearch} />
      {isModal && <Modal isModal={isModal} setIsModal={setIsModal} />}
    </Container>
  );
}

const Container = styled(FlexColumn)`
  width: 24rem;
  height: 90vh;
  border: 4px solid ${colors.black};
  border-radius: 1rem;
  margin: 1.5rem auto 0;
  padding: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

export default App;
