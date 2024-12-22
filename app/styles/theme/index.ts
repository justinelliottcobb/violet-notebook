import { createTheme, MantineColorScheme } from '@mantine/core';
import { violetColors } from './colors';

const baseTheme = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  primaryColor: 'violet',
  primaryShade: { light: 6, dark: 5 },
  headings: {
    fontFamily: 'inherit',
    fontWeight: 600,
  }
};

export const lightTheme = createTheme({
  ...baseTheme,
  colors: {
    violet: violetColors.violet,
    gray: violetColors.gray,
  },
  components: {
    Button: {
      defaultProps: { color: 'violet' },
      styles: {
        root: {
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'transform 0.2s ease',
          }
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  ...baseTheme,
  colors: {
    violet: violetColors.violetDark,
    gray: violetColors.gray.reverse(),
  },
  components: {
    Button: {
      defaultProps: { color: 'violet' },
      styles: {
        root: {
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'transform 0.2s ease',
          }
        }
      }
    }
  }
});
