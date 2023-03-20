import { Color } from "@/styles/sharedStyles";
import { css } from "@emotion/react";
import { ButtonHTMLAttributes, ReactNode, useMemo } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string | ReactNode;
  size?: "lg" | "md" | "sm";
  outline?: boolean;
  color?: Color;
};

const defaultButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;

export default function Button({
  size = "md",
  outline = false,
  color = "#4B7FF0",
  children,
  ...args
}: ButtonProps) {
  const buttonStyle = useMemo(
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
      border-radius: 5px;
    `,
    [outline, color]
  );

  const buttonSizeStyle = useMemo(() => {
    return css`
      ${size === "lg" &&
      css`
        width: 144px;
        height: 47px;
        font-size: 18px;
      `}
      ${size === "md" &&
      css`
        width: 105px;
        height: 26px;
        font-size: 13px;
      `}
      ${size === "sm" &&
      css`
        width: 63px;
        height: 20px;
        font-size: 11px;
      `}
    `;
  }, [size]);
  return (
    <button css={[defaultButtonStyle, buttonStyle, buttonSizeStyle]} {...args}>
      {children}
    </button>
  );
}
