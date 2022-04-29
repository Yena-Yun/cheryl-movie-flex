import styled from 'styled-components';
import { Flexbox, FlexCenter } from 'styles/commonStyles';
import { colors } from 'styles/theme';
import { BiSearchAlt } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';

interface ITab {
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
}

const Tab = ({ isSearch, setIsSearch }: ITab) => {
  return (
    <Container>
      <Flexbox>
        <TabBlock
          onClick={() => {
            setIsSearch(true);
          }}
        >
          <BiSearchAlt size='1.7rem' />
          검색
        </TabBlock>
        <TabBlock onClick={() => setIsSearch(false)}>
          <BsStar size='1.5rem' />
          즐겨찾기
        </TabBlock>
      </Flexbox>
      <TabBar isSearch={isSearch} />
    </Container>
  );
};

const Container = styled(FlexCenter)`
  position: relative;
  margin-top: 0.6rem;
`;

const TabBlock = styled(FlexCenter)`
  flex-direction: column;
  width: 9rem;
  cursor: pointer;
`;

const TabBar = styled.div<{ isSearch: boolean }>`
  width: 10rem;
  height: 2px;
  background-color: ${colors.black};
  position: absolute;
  top: -1.7rem;
  ${(props) => (props.isSearch ? 'left: 0' : 'right: 0')}
`;

export default Tab;
