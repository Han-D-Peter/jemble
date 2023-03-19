import { css } from "@emotion/react";
import { ReactNode } from "react";

interface BoxProps {
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

export default function Box({ title, children }: BoxProps) {
  return (
    <section css={boxStyle}>
      <div css={innerBoxStyle}>
        {title && <h1 css={titleStyle}>{title}</h1>}
        {children}
      </div>
    </section>
  );
}
