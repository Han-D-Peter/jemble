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
};

function DefaultLayout(
  { isLogined, header, children, ...args }: DefaultLayoutProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const theme = useTheme();

  const layoutMainStyle = useMemo(() => {
    return css`
      background-color: ${theme.background.default};
      height: 100%;
      flex-direction: column;
    `;
  }, [theme]);

  return (
    <div ref={ref} {...args}>
      {header && <header css={centeredStyle}>{header}</header>}
      <main css={[centeredStyle, layoutMainStyle]}>{children}</main>
      {isLogined && <Navigation />}
    </div>
  );
}

export default forwardRef(DefaultLayout);
