import { css } from "@emotion/react";

interface SubTileProps {
  text: string;
}

const textStyle = css`
  font-size: 16px;
  color: #6b6a6a;
`;

export default function SubTitle({ text }: SubTileProps) {
  return (
    <div>
      <div css={textStyle}>{text}</div>
    </div>
  );
}
