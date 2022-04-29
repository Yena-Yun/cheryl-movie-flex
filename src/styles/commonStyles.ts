import styled from 'styled-components';

export const SizedBox = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const Flexbox = styled.div<{ margin?: string }>`
  display: flex;
  ${(props) => props.margin && `margin: ${props.margin}`}
`;

export const FlexCenter = styled(Flexbox)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flexbox)<{ margin?: string }>`
  flex-direction: column;
  ${(props) => props.margin && `margin: ${props.margin}`}
`;

export const ButtonFlexCenter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBox = styled.img<{ width?: number; height?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const ResultBox = styled.div`
  height: 24rem;
  overflow-y: auto;
  border-top: 1px solid #8e8e8e;
`;

export const TextBox = styled.p<{
  size: string;
  weight?: number;
  center?: boolean;
}>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  ${(props) => (props.center ? 'margin: 0 auto' : '')}
`;
