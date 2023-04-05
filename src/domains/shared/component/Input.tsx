import { css } from "@emotion/react";
import {
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isOnlyNumber?: boolean;
  autoFocus?: boolean;
}

const defaultInputSytle = css`
  width: 100%;
  background: #d8d8d8;
  height: 40px;
  border-radius: 5px;
  font-size: 24px;
  padding-left: 20px;
  box-sizing: border-box;
`;

function Input(
  { isInvalid = false, isOnlyNumber = false, autoFocus, ...args }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
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

  useLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (isOnlyNumber)
    return (
      <input
        ref={mergeRefs([ref, inputRef])}
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
