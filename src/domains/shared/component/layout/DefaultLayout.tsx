import {
  forwardRef,
  ReactNode,
  useMemo,
  LegacyRef,
  HTMLAttributes,
} from "react";
import { useTheme, css } from "@emotion/react";
import Navigation from "../Navigation";
import { centeredStyle } from "@/styles/sharedStyles";

type DefaultLayoutProps = HTMLAttributes<HTMLDivElement> & {
  isLogined?: boolean;
  header?: ReactNode;
  children: ReactNode | ReactNode[];
  centered?: boolean;
};

function DefaultLayout(
  {
    isLogined,
    header,
    children,
    centered = false,
    ...args
  }: DefaultLayoutProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const theme = useTheme();

  const layoutMainStyle = useMemo(() => {
    return css`
      background-color: ${theme.background.default};
      height: 100%;
      ${centered &&
      css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    `;
  }, [theme, isLogined, centered]);

  return (
    <div
      css={css`
        height: 100%;
      `}
      ref={ref}
      {...args}
    >
      {header && <header css={centeredStyle}>{header}</header>}
      <main css={[layoutMainStyle]}>{children}</main>
      {isLogined && <Navigation />}
    </div>
  );
}

export default forwardRef(DefaultLayout);
