import { ReactNode, useMemo } from "react";
import { useTheme, css } from "@emotion/react";
import Navigation from "../Navigation";
import { centeredStyle } from "@/styles/sharedStyles";

interface DefaultLayoutProps {
  isLogined?: boolean;
  header?: ReactNode;
  children: ReactNode | ReactNode[];
}

export default function DefaultLayout({
  isLogined,
  header,
  children,
}: DefaultLayoutProps) {
  const theme = useTheme();

  const layoutMainStyle = useMemo(() => {
    return css`
      background-color: ${theme.background.default};
      height: 100vh;
      flex-direction: column;
    `;
  }, [theme]);

  return (
    <>
      {header && <header css={centeredStyle}>{header}</header>}
      <main css={[centeredStyle, layoutMainStyle]}>{children}</main>
      {isLogined && <Navigation />}
    </>
  );
}
