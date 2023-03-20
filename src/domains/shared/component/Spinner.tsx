import { useMemo } from "react";

import { css, keyframes, useTheme } from "@emotion/react";
import { centeredStyle, Color } from "@/styles/sharedStyles";

export interface SpinnerProps {
  color?: Color;
  size?: "lg" | "md" | "sm";
  outline?: boolean;
}

const Spinner = ({
  color = "#4C7FEF",
  outline = false,
  size = "md",
}: SpinnerProps) => {
  const spinnerStyle = useMemo(() => {
    const rotation = keyframes`
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    `;
    return css`
      box-sizing: border-box;
      ${size === "sm" &&
      css`
        width: 10px;
        height: 10px;
        border: 3px solid transparent;
      `}
      ${size === "md" &&
      css`
        width: 30px;
        height: 30px;
        border: 5px solid transparent;
      `}
      ${size === "lg" &&
      css`
        width: 50px;
        height: 50px;
        border: 8px solid transparent;
      `}

      border-radius: 50%;
      border-top-color: ${outline ? "white" : color};
      border-bottom-color: ${outline ? "white" : color};
      animation: ${rotation} 0.8s ease infinite;
    `;
  }, [color, size, outline]);

  return (
    <div css={centeredStyle}>
      <div css={spinnerStyle} />
    </div>
  );
};

export default Spinner;
