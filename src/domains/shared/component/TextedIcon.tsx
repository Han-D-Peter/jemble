import { Color } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import { ReactElement, useMemo } from "react";

type TextedIconProps = {
  bottomText: string;
  icon: ReactElement;
  size?: number;
  color?: Color;
};

function TextedIcon({
  bottomText,
  icon,
  size = 16,
  color = "#000000",
}: TextedIconProps) {
  const IconText = useMemo(
    () => css`
      font-size: ${size}px;
      color: ${color};
    `,
    [size, color]
  );

  return (
    <div css={IconContainer} aria-labelledby={bottomText}>
      <div>{icon}</div>
      {bottomText && <div css={IconText}>{bottomText}</div>}
    </div>
  );
}

const IconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default TextedIcon;
