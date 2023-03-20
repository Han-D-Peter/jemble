import { css } from "@emotion/react";
import { forwardRef, HTMLAttributes, LegacyRef, ReactNode } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode | null;
}

const boxStyle = css`
  background: #fff;
  width: 100%;
  border-radius: 7px;
  margin: 5px 0 5px 0;
`;

const innerBoxStyle = css`
  padding: 7px 24px 7px 24px;
`;

const titleStyle = css`
  font-weight: 800;
  font-size: 22px;
`;

function Box(
  { title, children, ...args }: BoxProps,
  ref: LegacyRef<HTMLDivElement>
) {
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
