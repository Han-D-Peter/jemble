import { css } from "@emotion/react";

interface Spacing {
  widthGap?: number;
  heightGap?: number;
}

export default function Spacing({ widthGap, heightGap }: Spacing) {
  return (
    <div
      css={css`
        ${widthGap &&
        css`
          margin-right: ${widthGap}px;
        `}
        ${heightGap &&
        css`
          margin-top: ${heightGap}px;
        `}
      `}
    ></div>
  );
}
