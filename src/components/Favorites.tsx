import { useRecoilValue } from 'recoil';
import { movieState } from 'state/movie';
import styled from 'styled-components';
import {
  Flexbox,
  FlexColumn,
  ImageBox,
  ResultBox,
  TextBox,
} from 'styles/commonStyles';
import { colors, fontSizes, fontWeights } from 'styles/theme';
import { IMovie } from 'utils/types/movieType';

const Favorites = () => {
  const movie = useRecoilValue(movieState);

  return (
    <Container>
      <div style={{ textAlign: 'center', margin: '1rem 0 1.2rem' }}>
        <TextBox size={fontSizes.subtitle} weight={fontWeights.subtitle}>
          내 즐겨찾기
        </TextBox>
      </div>
      {movie.length > 0 ? (
        <ResultBox>
          {movie.map((m: IMovie) => {
            console.log(m);
            return (
              <Flexbox key={m.id} margin='0.5rem'>
                <ImageBox
                  src={m.medium_cover_image}
                  alt='movie poster'
                  width={100}
                />
                <FlexColumn margin='0.2rem 0 0 0.7rem'>
                  <TextBox size={fontSizes.subtitle}>{m.title_long}</TextBox>
                  <TextBox size={fontSizes.paragraph}>{m.mpa_rating}</TextBox>
                  <TextBox size={fontSizes.paragraph}>{m.rating}</TextBox>
                  <TextBox size={fontSizes.paragraph}>{m.runtime} min.</TextBox>
                </FlexColumn>
              </Flexbox>
            );
          })}
        </ResultBox>
      ) : (
        '아직 즐겨찾기하신 영화가 없어요!'
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 60vh;
  margin: 1rem 0;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
`;

export default Favorites;
