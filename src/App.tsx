import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Search from './components/Search';
import Favorites from 'components/Favorites';
import Tab from 'components/Tab';
import { FlexColumn, TextBox } from 'styles/commonStyles';
import { fontSizes, fontWeights, colors } from 'styles/theme';
import { IMovie } from 'utils/types/movieType';
import Modal from 'components/Modal';
import { useRecoilState } from 'recoil';
import { paramState } from 'state/apiParam';

function App() {
  const [data, setData] = useState<IMovie[]>();
  const [isSearch, setIsSearch] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [keyword, setKeyword] = useState('아이언맨');
  const [param, setParam] = useRecoilState(paramState);

  useEffect(() => {
    (async () => {
      const ID_KEY = 'b8VDOmg9HDiCc7_2DX2i';
      const SECRET_KEY = '6EKrXK5KFa';

      try {
        if (keyword === '') {
          return false;
        } else {
          const response = await axios.get('/v1/search/movie.json', {
            params: {
              query: keyword,
              display: 5,
            },
            headers: {
              'X-Naver-Client-Id': ID_KEY,
              'X-Naver-Client-Secret': SECRET_KEY,
            },
          });
          console.log(response.data);
          setData(response.data.items);
          setParam({ query: keyword, display: 5 });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <TextBox size={fontSizes.title} weight={fontWeights.title} center>
        CheryFlex
      </TextBox>
      {isSearch ? (
        <Search data={data} setIsModal={setIsModal} />
      ) : (
        <Favorites />
      )}
      <Tab isSearch={isSearch} setIsSearch={setIsSearch} />
      {isModal && <Modal isModal={isModal} setIsModal={setIsModal} />}
    </Container>
  );
}

const Container = styled(FlexColumn)`
  width: 20rem;
  height: 90vh;
  border: 4px solid ${colors.black};
  border-radius: 1rem;
  margin: 1rem auto 0;
  padding: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

export default App;
