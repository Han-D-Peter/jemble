import { ButtonHTMLAttributes, ReactElement } from "react";
import { css } from "@emotion/react";

type IconButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactElement;
  text: string;
};

export default function IconButton({ icon, text, ...args }: IconButton) {
  return (
    <li
      css={css`
        list-style: none;
      `}
    >
      <button
        css={css`
          background: none;
          border: none;
        `}
        {...args}
      >
        <div>{icon}</div>
        <div
          css={css`
            font-size: 16px;
          `}
        >
          {text}
        </div>
      </button>
    </li>
  );
}
