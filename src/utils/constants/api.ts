export const BASE_URL = (props: { query: string; display: number }) => {
  return `https://openapi.naver.com/v1/search/movie.json?query=${props.query}&display=${props.display}`;
};
