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
  height: 90%;
  overflow: auto;
  padding: 7px 24px 7px 24px;
`;

const titleStyle = css`
  font-weight: 800;
  font-size: 22px;
  margin-left: 20px;
`;

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ title, children, fullHeight = false, ...args }, ref) => {
    const boxStyle = useMemo(
      () => css`
        position: relative;
        background: #fff;
        padding: 0;
        width: 100%;
        ${fullHeight &&
        css`
          height: calc(100% - 70px);
          max-height: calc(100% - 70px);
        `}
        border-radius: 7px;
        margin: 5px 0 5px 0;
        &::-webkit-scrollbar {
          display: none;
        }
      `,
      []
    );
    return (
      <section css={boxStyle}>
        {title && (
          <>
            <div
              css={css`
                background-color: #fff;
                height: 50px;
                width: 100%;
                border-radius: 7px 7px 0 0;
              `}
            ></div>
            <div
              css={css`
                background-color: #fff;
                height: 50px;
                width: 100%;
                position: absolute;
                top: 0;
                border-radius: 7px 7px 0 0;
              `}
            >
              <h1 css={titleStyle}>{title}</h1>
            </div>
          </>
        )}
        <div ref={ref} css={innerBoxStyle} {...args}>
          {children}
        </div>
      </section>
    );
  }
);

export default Box;
