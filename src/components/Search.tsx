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
import React, {
  ReactComponentElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { paramState } from 'state/apiParam';
import axios from 'axios';
import { BASE_URL } from 'utils/constants/api';

const Search = (props: { setIsModal: (isModal: boolean) => void }) => {
  const [data, setData] = useState<IMovie[]>();
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IMovie[] | undefined>();
  const [movie, setMovie] = useRecoilState(movieState);
  const [param, setParam] = useRecoilState(paramState);

  useEffect(() => {
    (async () => {
      const ID_KEY = 'b8VDOmg9HDiCc7_2DX2i';
      const SECRET_KEY = '6EKrXK5KFa';
      const DISPLAY = 5;

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}?sort_by=download_count`);
        console.log(response.data.data.movies);
        setData(response.data.data.movies);
        // setParam({ query: keyword, display: DISPLAY });

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

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLInputElement>, keyword: string) => {
      e.preventDefault();
      console.log(keyword);
      const resultData = data?.filter((item) =>
        item.title_long.includes(keyword)
      );
      console.log(resultData);
      setData(resultData);
    },
    []
  );

  useEffect(() => {
    const debounce = setTimeout((e) => {
      handleSearch(e, keyword);
    }, 500);
    return () => clearTimeout(debounce);
  }, [keyword, handleSearch]);

  useEffect(() => {
    if (!keyword) {
      setKeyword('');
      setResult([]);
    }
  }, [keyword]);

  // const handleKeyPress = useCallback(
  //   (
  //     e: React.KeyboardEvent<HTMLInputElement>,
  //     event: React.FormEvent<HTMLInputElement>
  //   ) => {
  //     if (e.key === 'Enter') {
  //       handleSearch(event, keyword);
  //     }
  //   },
  //   []
  // );

  return (
    <Container>
      <SearchForm>
        <SearchInput
          type='text'
          value={input}
          onChange={handleChange}
          autoFocus
          // onKeyPress={(e) => handleKeyPress}
        />
        <SearchBtn type='submit' onClick={(e) => handleSearch}>
          <ImSearch size='1.5rem' color='#8e8e8e' />
        </SearchBtn>
      </SearchForm>
      {!loading && data ? (
        <ResultBox>
          {data?.map((m: IMovie) => {
            return (
              <div
                key={m.id}
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
                <Flexbox margin='1.5rem 0.5rem'>
                  <ImageBox
                    src={m.medium_cover_image}
                    alt='movie poster'
                    width={100}
                  />
                  <FlexColumn margin='0.2rem 0 0 0.7rem'>
                    <TextBox size={fontSizes.subtitle}>{m.title_long}</TextBox>
                    <TextBox size={fontSizes.paragraph}>{m.mpa_rating}</TextBox>
                    <TextBox size={fontSizes.paragraph}>{m.rating}</TextBox>
                    <TextBox size={fontSizes.paragraph}>
                      {m.runtime} min.
                    </TextBox>
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
  margin: 1.5rem 0;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
`;

const SearchForm = styled.form`
  display: flex;
  width: 20rem;
  margin: 1.5rem auto 1.8rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 2px solid ${colors.gray};
  border-radius: 0.4rem;
  padding: 0.8rem 0.5rem;
`;

const SearchBtn = styled.button`
  display: flex;
  position: absolute;
  top: 0.6rem;
  right: 0.5rem;
`;

export default Search;
