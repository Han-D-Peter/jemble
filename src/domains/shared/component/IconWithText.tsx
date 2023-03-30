import { css } from "@emotion/react";
import { createElement, ReactElement, SVGAttributes } from "react";

type IconWithTextProps = {
  bottomText?: string;
  icon: ReactElement;
};

function IconWithText({ bottomText, icon, ...args }: IconWithTextProps) {
  return (
    <div css={IconContainer}>
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