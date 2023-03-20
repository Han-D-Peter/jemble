import { Color } from "@/styles/sharedStyles";
import { css } from "@emotion/react";

interface ErrorMsgProps {
  text: string;
  color?: Color;
}

export default function ErrorMsg({ text, color = "#ff0000" }: ErrorMsgProps) {
  const errorTextStyle = css`
    font-size: 15px;
    font-weight: 700;
    color: ${color};
  `;
  return <div css={errorTextStyle}>{text}</div>;
}
