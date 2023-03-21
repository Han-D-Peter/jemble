import { css } from "@emotion/react";
import {
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  ReactNode,
  useMemo,
} from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
  children?: ReactNode | null;
}

const innerBoxStyle = css`
  height: 100%;
  padding: 7px 24px 7px 24px;
`;

const titleStyle = css`
  font-weight: 800;
  font-size: 22px;
`;

function Box(
  { title, children, fullHeight = false, ...args }: BoxProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const boxStyle = useMemo(
    () => css`
      background: #fff;
      width: 100%;
      ${fullHeight &&
      css`
        height: calc(100% - 70px);
        max-height: calc(100% - 70px);
      `}
      border-radius: 7px;
      margin: 5px 0 5px 0;
    `,
    []
  );
  return (
    <section css={boxStyle}>
      <div ref={ref} css={innerBoxStyle} {...args}>
        {title && <h1 css={titleStyle}>{title}</h1>}
        {children}
      </div>
    </section>
  );
}

export default forwardRef(Box);
