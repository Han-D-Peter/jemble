import { Color } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import { useMemo } from "react";

interface BadgeProps {
  outline: boolean;
  text: string;
  color: Color;
}

const textStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding: 3px;
`;

export default function Badge({ outline = false, text, color }: BadgeProps) {
  const badgeStyle = useMemo(
    () => css`
      ${outline
        ? css`
            color: ${color};
            box-shadow: 0 0 0 1px ${color} inset;
          `
        : css`
            color: white;
            background: ${color};
          `}
      width: 63px;
      height: 20px;
      border-radius: 5px;
    `,
    [outline, color]
  );

  return (
    <div css={badgeStyle}>
      <div css={textStyle}>{text}</div>
    </div>
  );
}
