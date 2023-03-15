import { css } from "@emotion/react";

const defaultGlobalStyles = css`
  @font-face {
    font-family: "GemunuLibre";
    font-style: extralight;
    font-weight: 200;
    src: url("/fonts/GemunuLibre-ExtraLight.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: light;
    font-weight: 300;
    src: url("/fonts/GemunuLibre-Light.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: regular;
    font-weight: 400;
    src: url("/fonts/GemunuLibre-Light.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: medium;
    font-weight: 500;
    src: url("/fonts/GemunuLibre-Medium.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: semibold;
    font-weight: 600;
    src: url("/fonts/GemunuLibre-Medium.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: bold;
    font-weight: 700;
    src: url("/fonts/GemunuLibre-Medium.ttf");
  }
  @font-face {
    font-family: "GemunuLibre";
    font-style: extrabold;
    font-weight: 800;
    src: url("/fonts/GemunuLibre-Medium.ttf");
  }
  * {
    font-family: GemunuLibre;
    font-weight: 500;
  }
  body {
    margin: 0;
    padding: 10px;
    width: 100vw;
    height: 100vh;
    background-color: #e8e8e8;
  }
`;

export default defaultGlobalStyles;
