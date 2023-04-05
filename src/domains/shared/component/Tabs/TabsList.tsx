import { css } from "@emotion/react";
import useTabs from "./useTabs";

export default function TabsList() {
  const { selectedKey, tabStacks } = useTabs();
  return (
    <div
      css={css`
        padding: 7px 24px 7px 24px;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        {tabStacks[selectedKey]}
      </div>
    </div>
  );
}
