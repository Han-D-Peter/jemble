import { ButtonHTMLAttributes, ReactElement } from "react";
import { css } from "@emotion/react";
import Icon from "./IconWithText";

type IconButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement<typeof Icon>;
};

export default function IconButton({ children, ...args }: IconButton) {
  return (
    <button
      css={css`
        background: none;
        border: none;
      `}
      {...args}
    >
      {children}
    </button>
  );
}
