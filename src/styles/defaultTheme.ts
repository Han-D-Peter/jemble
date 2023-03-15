const theme: {
  background: {
    default: string;
  };
} = {
  background: {
    default: "#E8E8E8",
  },
};

type ThemeType = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}

export default theme;
