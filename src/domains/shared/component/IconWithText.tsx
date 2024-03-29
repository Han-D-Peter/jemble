import { Color } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import { ReactElement } from "react";

type IconWithTextProps = {
  bottomText: string;
  icon: ReactElement;
  color?: Color;
};

function IconWithText({
  bottomText,
  icon,
  color = "#000000",
}: IconWithTextProps) {
  const IconText = css`
    font-size: 16px;
    color: ${color};
  `;

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

const IconText = css`
  font-size: 16px;
`;

export default IconWithText;
