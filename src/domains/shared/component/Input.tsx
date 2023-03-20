import { css } from "@emotion/react";
import { forwardRef, HTMLAttributes, LegacyRef, useMemo } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isOnlyNumber?: boolean;
}

const defaultInputSytle = css`
  width: 100%;
  background: #d8d8d8;
  height: 40px;
  border-radius: 5px;
  font-size: 24px;
`;

function Input(
  { isInvalid = false, isOnlyNumber = false, ...args }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  const invalidInputStyle = useMemo(
    () => css`
      border: 1px solid ${isInvalid ? "red" : "#cbd5e0"};
      &:focus {
        ${!isInvalid &&
        css`
          outline: none;
          border: 1px solid "red";
        `}
      }
    `,
    [isInvalid]
  );

  if (isOnlyNumber)
    return (
      <input
        ref={ref}
        type="number"
        css={[defaultInputSytle, invalidInputStyle]}
        {...args}
      />
    );
  return (
    <input ref={ref} css={[defaultInputSytle, invalidInputStyle]} {...args} />
  );
}

export default forwardRef(Input);
