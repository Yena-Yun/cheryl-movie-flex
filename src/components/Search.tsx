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

const Search = (props: {
  data: IMovie[] | undefined;
  setIsModal: (isModal: boolean) => void;
}) => {
  const [movie, setMovie] = useRecoilState(movieState);

  return (
    <Container>
      <SearchForm action='' method='POST'>
        <SearchInput type='text' />
        <SearchBtn type='submit'>
          <ImSearch size='1.2rem' />
        </SearchBtn>
      </SearchForm>
      {props.data ? (
        <ResultBox>
          {props.data.map((m: IMovie) => (
            <div
              key={m.imdbID}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setMovie([...movie, m]);
                props.setIsModal(true);
              }}
            >
              <Flexbox key={m.imdbID} margin='0.5rem'>
                <ImageBox src={m.Poster} alt='movie poster' width={100} />
                <FlexColumn margin='0.2rem 0 0 0.7rem'>
                  <TextBox size={fontSizes.subtitle}>{m.Title}</TextBox>
                  <TextBox size={fontSizes.paragraph}>{m.Year}</TextBox>
                  <TextBox size={fontSizes.paragraph}>{m.Type}</TextBox>
                </FlexColumn>
              </Flexbox>
            </div>
          ))}
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