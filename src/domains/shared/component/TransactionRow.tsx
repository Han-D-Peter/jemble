import { css } from "@emotion/react";
import { ReactElement } from "react";

interface TransactionRowProps {
  text: string;
  icon?: string | ReactElement;
}

const profileRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 8px 0;
`;

const iconBoxStyle = css`
  margin-left: 10px;
`;

export default function TransactionRow({ text, icon }: TransactionRowProps) {
  return (
    <li>
      <div css={profileRowStyle}>
        <div
          css={css`
            font-size: 14px;
          `}
        >
          {text}
        </div>
        <div css={iconBoxStyle}>{icon}</div>
      </div>
    </li>
  );
}
