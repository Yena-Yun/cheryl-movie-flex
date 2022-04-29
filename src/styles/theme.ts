const pixelToRem = (size: number) => `${size / 16}rem`;

export const fontSizes = {
  title: pixelToRem(50),
  subtitle: pixelToRem(22),
  paragraph: pixelToRem(16),
};

export const fontWeights = {
  title: 700,
  subtitle: 600,
};

export const colors = {
  gray: '#8e8e8e',
  black: '#000000',
};
