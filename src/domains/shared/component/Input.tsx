import { css } from "@emotion/react";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
  isOnlyNumber?: boolean;
  autoFocus?: boolean;
};

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
  {
    isInvalid = false,
    isOnlyNumber = false,
    autoFocus,
    onChange,
    ...args
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
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
  const onChangeInputOnlyNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    const value = e.target.value;
    setInputValue(value.replace(/[^\d]/g, ""));
  };

  useLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (isOnlyNumber)
    return (
      <input
        ref={mergeRefs([ref, inputRef])}
        type="text"
        css={[defaultInputSytle, invalidInputStyle]}
        value={args.value ? args.value : inputValue}
        onChange={onChangeInputOnlyNumber}
        {...args}
      />
    );
  return (
    <input ref={ref} css={[defaultInputSytle, invalidInputStyle]} {...args} />
  );
}

export default forwardRef(Input);
