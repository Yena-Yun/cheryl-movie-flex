import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';
import {
  Flexbox,
  FlexColumn,
  ImageBox,
  ResultBox,
  TextBox,
} from 'styles/commonStyles';
import { fontSizes, colors } from 'styles/theme';
import { IMovie } from 'utils/types/movieType';
import { useRecoilState } from 'recoil';
import { movieState } from 'state/movie';
import { useCallback, useEffect, useState } from 'react';
import { paramState } from 'state/apiParam';
import axios from 'axios';

const Search = (props: { setIsModal: (isModal: boolean) => void }) => {
  const [data, setData] = useState<IMovie[]>();
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IMovie[] | undefined>();
  const [movie, setMovie] = useRecoilState(movieState);
  const [param, setParam] = useRecoilState(paramState);

  useEffect(() => {
    if (!keyword) {
      setKeyword('');
      setResult([]);
    }
  }, [keyword]);

  useEffect(() => {
    (async () => {
      const ID_KEY = 'b8VDOmg9HDiCc7_2DX2i';
      const SECRET_KEY = '6EKrXK5KFa';
      const DISPLAY = 5;

      try {
        setLoading(true);
        const response = await axios.get('/api/v1/search/movie.json', {
          params: {
            query: keyword,
            display: DISPLAY,
          },
          headers: {
            'X-Naver-Client-Id': ID_KEY,
            'X-Naver-Client-Secret': SECRET_KEY,
          },
        });
        console.log(response.data);
        setData(response.data.items);
        setParam({ query: keyword, display: DISPLAY });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    setKeyword(value);
  }, []);

  const handleSearch = useCallback(() => {
    if (keyword === '') return;
    const resultData = data?.filter((item) => item.title.includes(keyword));
    setResult(resultData);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
        setInput('');
      }
    },
    []
  );

  return (
    <Container>
      <SearchForm action='' method='POST'>
        <SearchInput
          type='text'
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <SearchBtn type='submit' onClick={handleSearch}>
          <ImSearch size='1.2rem' />
        </SearchBtn>
      </SearchForm>
      {!loading && result ? (
        <ResultBox>
          {result?.map((m: IMovie) => {
            const id = m.link.slice(m.link.indexOf('=') + 1);
            return (
              <div
                key={id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (movie.includes(m)) {
                    const uniqueMovies = movie.filter((el) => el !== m);
                    setMovie([...uniqueMovies]);
                  } else {
                    setMovie([...movie, m]);
                  }
                  props.setIsModal(true);
                }}
              >
                <Flexbox key={id} margin='0.5rem'>
                  <ImageBox src={m.image} alt='movie poster' width={100} />
                  <FlexColumn margin='0.2rem 0 0 0.7rem'>
                    <TextBox size={fontSizes.subtitle}>{m.title}</TextBox>
                    <TextBox size={fontSizes.paragraph}>{m.pubDate}</TextBox>
                    <TextBox size={fontSizes.paragraph}>{m.actor}</TextBox>
                    <TextBox size={fontSizes.paragraph}>{m.userRating}</TextBox>
                  </FlexColumn>
                </Flexbox>
              </div>
            );
          })}
        </ResultBox>
      ) : (
        '검색 결과가 없습니다.'
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 64vh;
  margin: 1rem 0;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
`;

const SearchForm = styled.form`
  display: flex;
  width: 18rem;
  margin: 1rem auto 1.2rem;
  position: relative;
`;

const SearchInput = styled.input`
  border: 2px solid ${colors.gray};
  border-radius: 0.4rem;
  padding: 0.4rem 0.5rem;
  width: 100%;
`;

const SearchBtn = styled.button`
  display: flex;
  position: absolute;
  top: 0.4rem;
  right: 0.2rem;
  width: 2rem;
`;

export default Search;
