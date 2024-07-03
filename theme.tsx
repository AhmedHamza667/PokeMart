import { createTheme } from '@shopify/restyle';

const palette = {
  black: '#0B0B0B',
  white: '#fff',
};

const lightTheme = createTheme({
  colors: {
    background: palette.white,
    text: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});

const darkTheme = createTheme({
  colors: {
    background: palette.black,
    text: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});

export type Theme = typeof lightTheme;
export { lightTheme, darkTheme };
