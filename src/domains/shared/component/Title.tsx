import { css } from "@emotion/react";

interface TitleProps {
  text: string;
}

const textStyle = css`
  font-size: 22px;
  font-weight: 800;
`;

export default function Title({ text }: TitleProps) {
  return (
    <div>
      <div css={textStyle}>{text}</div>
    </div>
  );
}
