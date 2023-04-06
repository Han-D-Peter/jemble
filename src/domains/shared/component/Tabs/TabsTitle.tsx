import { css } from "@emotion/react";
import { useMemo } from "react";

interface TabsTitleProps {
  selected?: boolean;
  children: string;
  onClick?: (value: string) => void;
}

export default function TabsTitle({
  selected,
  onClick,
  children,
}: TabsTitleProps) {
  const onClickTitle = () => {
    if (onClick) {
      onClick(children);
    }
  };

  const tabsTitleListStyle = useMemo(
    () => css`
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 22px;
      background: ${selected ? "#fff" : "#9a9a9a"};
      border-radius: 7px 7px 0 0;
    `,
    [selected]
  );

  const tabsTitleButtonStyle = useMemo(
    () => css`
      width: 100%;
      font-size: 22px;
      background: ${selected ? "#fff" : "#9a9a9a"};
      border: 0px;
      border-radius: 7px 7px 0 0;
    `,
    [selected]
  );
  return (
    <li css={tabsTitleListStyle}>
      <button css={tabsTitleButtonStyle} onClick={onClickTitle}>
        {children}
      </button>
    </li>
  );
}
